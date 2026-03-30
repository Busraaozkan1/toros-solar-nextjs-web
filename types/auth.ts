// types/auth.ts
import { z } from "zod";

/** LOGIN BÖLÜMÜ **/

// 1. Login Doğrulama Şeması
export const LoginSchema = z.object({
  username: z.string().min(1, "Kullanıcı adı gerekli"),
  password: z.string().min(1, "Şifre gerekli"),
  securityAnswer: z.preprocess(
    (val) => Number(val), 
    z.number({ message: "Güvenlik sorusunu yanıtlayın" })
  ),
});

// 2. Login Tipleri
export type LoginValues = z.infer<typeof LoginSchema>;
export interface LoginViewModel extends LoginValues {
  number1: number;
  number2: number;
}

/** REGISTER BÖLÜMÜ **/

// 3. Register Doğrulama Şeması
export const RegisterSchema = z.object({
  fullName: z.string().min(1, "Ad Soyad alanı zorunludur."),
  email: z.string()
    .min(1, "E-posta adresi zorunludur.")
    .email("Geçersiz e-posta adresi."),
  username: z.string().min(1, "Kullanıcı adı zorunludur."),
  password: z.string().min(6, "Şifre en az 6 karakter olmalıdır."),
  confirmPassword: z.string().min(1, "Şifre tekrarı zorunludur."),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Şifreler eşleşmiyor.",
  path: ["confirmPassword"],
});

// 4. Register Tipleri
export type RegisterValues = z.infer<typeof RegisterSchema>;
export type RegisterViewModel = RegisterValues;