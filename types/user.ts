// types/user.ts

export interface User {
  id: number;           // [Key]
  username: string;     // [Required]
  password: string;     // [Required] (Genellikle frontend'de şifreyi taşımayız ama tipte bulunabilir)
  email?: string | null; // string? Email (null olabilir)
}