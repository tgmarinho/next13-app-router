// basic field from product
const productPayload = ['id', 'description', 'name', 'main_image', 'images', 'status', 'price'];

export const getNewsProductQuery = `
  query getNewsProduct {
    tops(where: {is_new_launch: {_eq: true}}) {
      product {
        ${productPayload.join('\n\t\t')}
      }
    
    }
  }
`;

export const getPremiumProductQuery = `
  query getNewsProduct {
    tops(where: {is_premium: {_eq: true}}) {
      product {
        ${productPayload.join('\n\t\t')}
      }
    }
  }
`;

export const getProductByIdQuery = `
  query getProductById($id: bigint!) {
    products_by_pk(id: $id) {
      ${productPayload.join('\n\t\t')}
    }
  }
`;
