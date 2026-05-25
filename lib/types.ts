export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: string;
  price: number;
  image: string;
  active: boolean;
  featured: boolean;
  references: string[];
};

export type CartItem = {
  productId: string;
  name: string;
  image: string;
  reference: string;
  price: number;
  quantity: number;
};
