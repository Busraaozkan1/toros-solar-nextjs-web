export interface Product {
    id: number;          // ASP.NET: int Id
    name: string;        // ASP.NET: string Name
    description?: string; // ASP.NET: string Description (? işareti boş olabilir demek)
    price: number;       // ASP.NET: decimal Price
    imageUrl?: string;    // ASP.NET: string ImageUrl
    createdDate: string; // ASP.NET: DateTime CreatedDate
}