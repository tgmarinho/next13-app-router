export const insertProducts = `
  mutation InsertProducts(
    $user_id: bigint
    $price: Int
    $description: String
    $images: [String]
    $main_image: String
    $name: String
  ) {
    insert_products(
      objects: {
        user_id: $user_id
        price: $price
        description: $description
        images: $images
        main_image: $main_image
        name: $name
      }
    ) {
      affected_rows
    }
  }
`;

export const insertNewOrder = `
  mutation InsertNewOrder(
    $buyer_id: bigint
    $product_id: bigint
    $seller_id: bigint
    $status: String
  ) {
    insert_order_one(
      object: {
        buyer_id: $buyer_id
        product_id: $product_id
        seller_id: $seller_id
        status: $status
      }
    ) {
      id
    }
  }
`;

export const findProductsByUserId = `
  query GetProductsByUserId ($user_id: bigint) {
    products(where:{user_id: {_eq:$user_id}}) {
      status,
      main_image,
      name,
      price
     }
    }
`;

export const findSalesBySellerId = `
  query GetSalesBySellerId($seller_id: bigint) {
    order(where:{seller_id: {_eq:$seller_id}}) {
        status
        buyer {    
          name,
          email,
          address,
          cep,
          city,
          uf,
          created_at
        },
        product {    
          id,
          name,
          description,
          price,
          main_image,
        }
      }
    }
`;

export const GetOrderById = `
query GetOrder ($id: bigint) {
  order(where:{id: {_eq:$id}}) {
    status
      seller {    
        name,
        email,
        address
      }
      product {    
        name,
        description,
        price,
        main_image
      }
    }
  }

`;
