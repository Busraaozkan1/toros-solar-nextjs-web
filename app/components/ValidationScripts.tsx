"use client";

import React from 'react';
import Script from 'next/script';

/**
 * ASP.NET'teki _ValidationScriptsPartial.cshtml karşılığı.
 * Bu bileşen, formların olduğu sayfalara import edilerek 
 * istemci taraflı doğrulama altyapısını hazırlar.
 */
export default function ValidationScripts() {
    return (
        <>
            {/* jQuery Validation ana kütüphanesi */}
            <Script 
                src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.19.5/jquery.validate.min.js" 
                strategy="afterInteractive"
            />
            
            {/* Microsoft'un Unobtrusive Validation eklentisi */}
            <Script 
                src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validation-unobtrusive/3.2.13/jquery.validate.unobtrusive.min.js" 
                strategy="afterInteractive"
            />

            {/* Not: React/Next.js projelerinde form doğrulama genellikle 
                React Hook Form veya Formik gibi kütüphanelerle yapıldığı için 
                bu scriptler sadece özel bir jQuery bağımlılığınız varsa gereklidir. */}
        </>
    );
}