"use client"; // Hata bileşenleri mutlaka Client Component olmalıdır.

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Hatayı konsola yazdırarak loglayabiliriz
    console.error(error);
  }, [error]);

  // ASP.NET'teki ShowRequestId mantığını digest (hata özeti) ile simüle ediyoruz
  const requestId = error.digest;

  return (
    <div className="container py-5 mt-5">
      <div className="card border-danger shadow-sm p-4 bg-dark text-white">
        <h1 className="text-danger fw-bold">Error.</h1>
        <h2 className="text-danger h4">An error occurred while processing your request.</h2>

        <hr className="border-secondary" />

        {requestId && (
          <p className="mb-4">
            <strong>Request ID:</strong> <code className="bg-light text-dark px-2 py-1 rounded">{requestId}</code>
          </p>
        )}

        <div className="mt-4">
          <h3 className="h5 fw-bold">Development Mode</h3>
          <p className="text-white-50">
            Swapping to <strong>Development</strong> environment will display more detailed information about the error that occurred.
          </p>
          
          <div className="alert alert-warning border-0 bg-opacity-10 bg-warning text-warning p-3">
            <strong>The Development environment should not be enabled for deployed applications.</strong>
            <br />
            It can result in displaying sensitive information from exceptions to end users.
            For local debugging, enable the <strong>Development</strong> environment by setting the 
            <code className="text-dark mx-1">NODE_ENV</code> environment variable to <strong>development</strong> 
            and restarting the app.
          </div>
        </div>

        {/* Next.js'e özel: Kullanıcıya hatayı tekrar deneme şansı veren buton */}
        <div className="mt-4">
          <button
            className="btn btn-outline-danger px-4"
            onClick={() => reset()}
          >
            Tekrar Dene
          </button>
        </div>
      </div>
    </div>
  );
}