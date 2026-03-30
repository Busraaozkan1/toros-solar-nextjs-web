// types/favorite.ts
import { Product } from "./product"; // Eğer product.ts içinde Product interface'i varsa

export interface Favorite {
    id: number;
    userId: string;
    productId: number;
    product?: Product; // virtual Product? karşılığı (Opsiyonel ilişki)
}