

export async function POST(request: Request) {
  try {
    console.log("calling api cadastrar user")
    const res = await request.json()
    console.log({res})
    console.log(res?.body)
    const response = await Promise.resolve(()=> ({ data: "test"}))
    console.log({response})
    if (response.data) {
      return response.data;
    }

  } catch (error: any) {
    console.log({error})
    throw new Error(`GraphQL request error: ${error.message}`);
  }

}

