"use client";

import React, { useMemo, useRef, useState } from "react";
import * as XLSX from "xlsx";
import { CATEGORY_LABELS, categoryByLabel } from "@/lib/categories";

interface BulkRow {
    name: string;
    priceText?: string;
    description: string;
    category?: string;
    imageFilename?: string;
}

interface ImportResult {
    index: number;
    name: string;
    success: boolean;
    id?: number;
    hasImage?: boolean;
    message?: string;
}

interface BulkImportProps {
    kind: "product" | "project";
}

const HEADER_ALIASES: Record<string, string> = {
    name: "name", ad: "name", isim: "name", urun: "name", "ürün": "name", proje: "name",
    pricetext: "priceText", fiyat: "priceText", price: "priceText",
    description: "description", aciklama: "description", "açıklama": "description",
    imagefilename: "imageFilename", gorsel: "imageFilename", "görsel": "imageFilename",
    image: "imageFilename", resim: "imageFilename", foto: "imageFilename",
    category: "category", kategori: "category",
};

function normalizeHeader(h: string): string {
    const key = String(h || "").trim().toLowerCase().replace(/\s+/g, "");
    return HEADER_ALIASES[key] || key;
}

export default function BulkImport({ kind }: BulkImportProps) {
    const isProduct = kind === "product";
    const [rows, setRows] = useState<BulkRow[]>([]);
    const [sheetError, setSheetError] = useState<string | null>(null);
    const [images, setImages] = useState<File[]>([]);
    const [importing, setImporting] = useState(false);
    const [results, setResults] = useState<ImportResult[] | null>(null);
    const sheetInputRef = useRef<HTMLInputElement>(null);
    const imagesInputRef = useRef<HTMLInputElement>(null);

    const imageNames = useMemo(
        () => new Set(images.map((f) => f.name.toLowerCase())),
        [images]
    );

    const handleSheet = async (file: File | undefined) => {
        setResults(null);
        setSheetError(null);
        setRows([]);
        if (!file) return;

        try {
            const buf = await file.arrayBuffer();
            const wb = XLSX.read(buf);
            const ws = wb.Sheets[wb.SheetNames[0]];
            const raw = XLSX.utils.sheet_to_json<Record<string, unknown>>(ws, { defval: "" });

            const parsed: BulkRow[] = raw.map((r) => {
                const out: Record<string, string> = {};
                for (const [k, v] of Object.entries(r)) {
                    out[normalizeHeader(k)] = String(v ?? "").trim();
                }
                return {
                    name: out.name || "",
                    priceText: out.priceText || "",
                    description: out.description || "",
                    category: out.category || "",
                    imageFilename: out.imageFilename || "",
                };
            }).filter((r) => r.name || r.description || r.priceText);

            if (parsed.length === 0) {
                setSheetError("Dosyada satir bulunamadi. Sablonu indirip kolon adlarini kontrol edin.");
                return;
            }

            setRows(parsed);
        } catch {
            setSheetError("Dosya okunamadi. .xlsx, .xls veya .csv yukleyin.");
        }
    };

    const downloadTemplate = () => {
        const header = isProduct
            ? ["name", "priceText", "kategori", "description", "imageFilename"]
            : ["name", "description", "imageFilename"];
        const example = isProduct
            ? ["Solinved 550W Monokristal Panel", "4.250 TL", "Güneş Panelleri", "550W guc\n%21.3 verim\n25 yil garanti", "panel-550w.jpg"]
            : ["Mersin Mezitli 10kW Cati GES", "10kW cati kurulumu, 18 panel", "mezitli-ges.jpg"];
        const ws = XLSX.utils.aoa_to_sheet([header, example]);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Sablon");
        XLSX.writeFile(wb, isProduct ? "urun-sablonu.xlsx" : "proje-sablonu.xlsx");
    };

    const rowProblems = (r: BulkRow): string | null => {
        if (!r.name) return "name bos";
        if (!r.description) return "description bos";
        if (isProduct && !r.priceText) return "priceText bos";
        if (isProduct && r.category && !categoryByLabel(r.category)) {
            return `kategori taninmadi: "${r.category}"`;
        }
        if (r.imageFilename && !/^https?:\/\//i.test(r.imageFilename) && !imageNames.has(r.imageFilename.toLowerCase())) {
            return "gorsel dosyasi secilmedi";
        }
        return null;
    };

    const validCount = rows.filter((r) => !rowProblems(r)).length;

    const handleImport = async () => {
        setImporting(true);
        setResults(null);
        try {
            const fd = new FormData();
            // kategori etiketlerini kanonik haline cevir (buyuk/kucuk harf farklari icin)
            const normalizedRows = rows.map((r) => ({
                ...r,
                category: r.category ? (categoryByLabel(r.category)?.label || r.category) : "",
            }));
            fd.append("rows", JSON.stringify(normalizedRows));
            for (const f of images) fd.append("images", f);

            const res = await fetch(`/api/admin/${isProduct ? "products" : "projects"}/bulk`, {
                method: "POST",
                body: fd,
            });

            const data = await res.json().catch(() => ({}));
            if (!res.ok) {
                setSheetError(data?.message || "Ice aktarma basarisiz.");
                return;
            }

            setResults(Array.isArray(data?.results) ? data.results : []);
        } catch {
            setSheetError("Sunucuya ulasilamadi.");
        } finally {
            setImporting(false);
        }
    };

    return (
        <div className="container py-4">
            <h2 className="mb-1">{isProduct ? "Toplu Ürün İçe Aktar" : "Toplu Proje İçe Aktar"}</h2>
            <p className="text-muted mb-4">
                Excel/CSV dosyası yükleyin, görselleri seçin, önizleyin ve tek tıkla içe aktarın.
            </p>

            <div className="card mb-3">
                <div className="card-body">
                    <div className="row g-3 align-items-end">
                        <div className="col-md-5">
                            <label className="form-label fw-bold">1) Excel / CSV dosyası</label>
                            <input
                                ref={sheetInputRef}
                                type="file"
                                className="form-control"
                                accept=".xlsx,.xls,.csv"
                                onChange={(e) => handleSheet(e.target.files?.[0])}
                            />
                            <div className="form-text">
                                Kolonlar: name{isProduct ? ", priceText, kategori" : ""}, description, imageFilename
                                {isProduct && (
                                    <>
                                        <br />
                                        Kategoriler: {CATEGORY_LABELS.join(" · ")}
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="col-md-5">
                            <label className="form-label fw-bold">2) Görseller (çoklu seçim)</label>
                            <input
                                ref={imagesInputRef}
                                type="file"
                                className="form-control"
                                accept="image/*"
                                multiple
                                onChange={(e) => setImages(Array.from(e.target.files || []))}
                            />
                            <div className="form-text">{images.length} görsel seçildi — dosya adına göre eşleşir</div>
                        </div>
                        <div className="col-md-2">
                            <button type="button" className="btn btn-outline-secondary w-100" onClick={downloadTemplate}>
                                <i className="bi bi-download me-1"></i> Şablon
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {sheetError && <div className="alert alert-danger">{sheetError}</div>}

            {rows.length > 0 && !results && (
                <>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <span>
                            <strong>{rows.length}</strong> satır okundu, <strong>{validCount}</strong> tanesi hazır
                        </span>
                        <button
                            className="btn btn-success"
                            disabled={importing || validCount === 0}
                            onClick={handleImport}
                        >
                            {importing ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2"></span>İçe aktarılıyor...
                                </>
                            ) : (
                                <>
                                    <i className="bi bi-cloud-upload me-2"></i>
                                    {validCount} kaydı içe aktar
                                </>
                            )}
                        </button>
                    </div>

                    <div className="table-responsive">
                        <table className="table table-sm table-bordered align-middle">
                            <thead className="table-light">
                                <tr>
                                    <th>#</th>
                                    <th>name</th>
                                    {isProduct && <th>priceText</th>}
                                    {isProduct && <th>kategori</th>}
                                    <th>description</th>
                                    <th>görsel</th>
                                    <th>durum</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rows.map((r, i) => {
                                    const problem = rowProblems(r);
                                    return (
                                        <tr key={i} className={problem ? "table-warning" : ""}>
                                            <td>{i + 1}</td>
                                            <td style={{ maxWidth: 220, overflowWrap: "anywhere" }}>{r.name}</td>
                                            {isProduct && <td>{r.priceText}</td>}
                                            {isProduct && <td>{r.category || <span className="text-muted">—</span>}</td>}
                                            <td style={{ maxWidth: 320, overflowWrap: "anywhere" }}>
                                                {r.description.length > 80 ? `${r.description.slice(0, 80)}...` : r.description}
                                            </td>
                                            <td>{r.imageFilename || <span className="text-muted">—</span>}</td>
                                            <td>
                                                {problem ? (
                                                    <span className="badge bg-warning text-dark">{problem}</span>
                                                ) : (
                                                    <span className="badge bg-success">hazır</span>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </>
            )}

            {results && (
                <div className="card">
                    <div className="card-body">
                        <h5 className="mb-3">
                            Sonuç: {results.filter((r) => r.success).length} başarılı,{" "}
                            {results.filter((r) => !r.success).length} hatalı
                        </h5>
                        <ul className="list-group">
                            {results.map((r) => (
                                <li
                                    key={r.index}
                                    className={`list-group-item d-flex justify-content-between ${r.success ? "" : "list-group-item-danger"}`}
                                >
                                    <span>
                                        {r.success ? (
                                            <i className="bi bi-check-circle-fill text-success me-2"></i>
                                        ) : (
                                            <i className="bi bi-x-circle-fill text-danger me-2"></i>
                                        )}
                                        {r.name}
                                    </span>
                                    <span className="text-muted small">
                                        {r.success ? (r.hasImage ? "görselli" : "görselsiz") : r.message}
                                    </span>
                                </li>
                            ))}
                        </ul>
                        <button
                            className="btn btn-outline-primary mt-3"
                            onClick={() => {
                                setRows([]);
                                setResults(null);
                                setImages([]);
                                if (sheetInputRef.current) sheetInputRef.current.value = "";
                                if (imagesInputRef.current) imagesInputRef.current.value = "";
                            }}
                        >
                            Yeni içe aktarma
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
