const HASURA_GRAPHQL_URL = process.env.HASURA_GRAPHQL_URL as string;
const HASURA_GRAPHQL_ADMIN_SECRET = process.env.HASURA_GRAPHQL_ADMIN_SECRET as string;

const requestOptions = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-hasura-admin-secret': HASURA_GRAPHQL_ADMIN_SECRET,
    'x-hasura-role': 'admin'
  }
};

const request = async <T>(
  query: string,
  variables: Record<string, any> = {},
  revalidate = 0
): Promise<T> => {
  try {
    const body = {
      query,
      variables,
      ...(revalidate ? { next: { revalidate } } : {})
    };

    const response = await fetch(HASURA_GRAPHQL_URL, {
      ...requestOptions,
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      throw new Error(`GraphQL request error: ${response.statusText}`);
    }

    const responseData = await response.json();
    return responseData as T;
  } catch (error: any) {
    throw new Error(`GraphQL request error: ${error.message}`);
  }
};

export const client = {
  request
};
