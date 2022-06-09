import {
  DetailsStyle,
  ImageWrapper,
  ProductInfo,
  Quantity,
  BuyStyles,
} from "../../styles/ProductDetails";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { GET_PRODUCT_QUERY } from "../../lib/query";
import { useQuery } from "urql";
import { useRouter } from "next/router";

export default function ProductDetails() {
  //Fetch slug
  const { query } = useRouter();
  //Fetch Graphql data
  const [results] = useQuery({
    query: GET_PRODUCT_QUERY,
    variables: { slug: query.slug },
  });
  const { data, fetching, error } = results;
  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;
  //Extract Data
  const { title, description, image, slug } = data.products.data[0].attributes;

  return (
    <DetailsStyle>
      <ImageWrapper>
        <img src={image.data.attributes.formats.medium.url} alt={title} />
      </ImageWrapper>
      <ProductInfo>
        <h3>{title}</h3>
        <p>{description}</p>
        <Quantity>
          <span>Quantity</span>
          <button>
            <AiFillMinusCircle />
          </button>
          <p>0</p>
          <button>
            <AiFillPlusCircle />
          </button>
        </Quantity>
        <BuyStyles>
          <button>Add To Cart</button>
        </BuyStyles>
      </ProductInfo>
    </DetailsStyle>
  );
}
