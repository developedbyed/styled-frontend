export const PRODUCT_QUERY = `query{
    products{
      data{
        attributes{
          description
          title
          slug
          price
                 image{
            data{
              attributes{
              formats
              }
            }
          }
        }
      }
    }
  }
  `;

export const GET_PRODUCT_QUERY = `
query getProducts($slug:String!){
  products(filters: {slug :{eq: $slug}}){
    data{
      attributes{
        title
        slug
        description
        price
        image{
          data{
            attributes{
              formats
            }
          }
        }
      }
    }
  }
}`;
