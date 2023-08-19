export interface Product {
  id: string; // [CR 19-08-2023] It would be useful to have a Guid type for IDs in your code. Think how could this be realized
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
}
