import { Product, ProductDB, Top, TopData } from 'lib/types';
import { client } from './connection';
import {
  findProductsByUserId,
  findSalesBySellerId,
  insertNewOrder,
  insertProducts
} from './mutations';
import { getNewsProductQuery, getPremiumProductQuery, getProductByIdQuery } from './queries';

export const getNewProducts = async () => {
  try {
    const response = await client.request<TopData>(getNewsProductQuery);

    if (response?.data?.tops) {
      return response.data.tops.map(({ product }: Top) => ({ ...product }));
    }

    throw new Error(`New Products Not Found`);
  } catch (error: any) {
    throw new Error(`GraphQL request error: ${error.message}`);
  }
};

export const getPremiumProducts = async () => {
  try {
    const response = await client.request<TopData>(getPremiumProductQuery);

    if (response?.data?.tops) {
      return response.data.tops.map(({ product }: Top) => ({ ...product }));
    }

    throw new Error(`Premium Products Not Found`);
  } catch (error: any) {
    throw new Error(`GraphQL request error: ${error.message}`);
  }
};

export const getProductById = async (id: number): Promise<Product> => {
  try {
    const response = await client.request<ProductDB>(getProductByIdQuery, { id }, 120);

    if (response.data.products_by_pk) {
      return response.data.products_by_pk;
    }

    throw new Error(`Product Not Found`);
  } catch (error: any) {
    throw new Error(`GraphQL request error: ${error.message}`);
  }
};

export const insertProduct = async (
  user_id: number,
  price: number,
  description: String,
  images: [String],
  main_image: String,
  name: String
) => {
  try {
    await client.request(insertProducts, {
      user_id,
      price,
      description,
      images,
      main_image,
      name
    });
  } catch (error) {
    console.error(error);
  }
};

export const insertOrder = async (
  buyer_id: number,
  product_id: number,
  seller_id: number,
  status: String
) => {
  try {
    const data = await client.request(insertNewOrder, {
      buyer_id,
      product_id,
      seller_id,
      status
    });

    console.log('data', { data });
    return { data };
  } catch (error) {
    console.log('error', { error });
  }
};

export const findOrderById = async (user_id: number) => {
  try {
    return await client
      .request(findProductsByUserId, {
        user_id
      })
      .then((res) => res)
      .then((data) => {
        return data.products;
      });
  } catch (error) {
    console.error(error);
  }
};

export const getProductsByUserId = async (user_id: number) => {
  try {
    return await client
      .request(findProductsByUserId, {
        user_id
      })
      .then((res) => res)
      .then((data) => {
        return data.products;
      });
  } catch (error) {
    console.error(error);
  }
};

export const findProductById = async (id: number) => {
  try {
    return await client
      .request(getProductByIdQuery, {
        id
      })
      .then((res) => res)
      .then((data) => {
        return data.products[0];
      });
  } catch (error) {
    console.error(error);
  }
};

export const GetSalesBySellerId = async (seller_id: number) => {
  try {
    return await client
      .request(findSalesBySellerId, {
        seller_id
      })
      .then((res) => res)
      .then((data) => {
        return data.order;
      });
  } catch (error) {
    console.error(error);
  }
};
