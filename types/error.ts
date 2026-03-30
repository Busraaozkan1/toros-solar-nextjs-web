// types/error.ts

export interface ErrorViewModel {
    requestId: string | null | undefined; // public string? RequestId karşılığı
}

// Not: C#'daki "ShowRequestId" bir hesaplanmış özelliktir (computed property).
// TypeScript interface'leri sadece veri yapısını tutar. 
// Bu kontrolü (boş mu dolu mu?) kullanacağın sayfada yapacaksın.