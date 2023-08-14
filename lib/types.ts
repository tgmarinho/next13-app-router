export type Menu = {
  title: string;
  path: string;
};

export type Product = {
  id: number;
  name: string;
  description: string;
  main_image: string;
  images: string[];
  status: boolean;
  price: string;
};

export type ProductDB = {
  data: {
    products_by_pk: Product;
  };
};

export interface ProductInfo {
  id: number;
  name: string;
  description: string;
  main_image: string;
  images: string[];
  status: boolean;
  price: string;
}

export interface Top {
  product: ProductInfo;
}

interface TopsData {
  tops: Top[];
}

export interface TopData {
  data: TopsData;
}
