export interface IProduct {
  name: string;
  description?: string;
  price: number;
  images?: string[];
  category?: string;
  stock: number;
  isDeleted?: boolean;
  createdAt?: Date;
}
