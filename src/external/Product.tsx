import { ProductType } from "../components/Product";

export async function getAllProducts(): Promise<ProductType[]> {
  const products_api_url = import.meta.env.VITE_REST_API_SERVER_URL + "/products";
  let productList: ProductType[] = [];
  await fetch(products_api_url)
    .then((res) => res.json())
    .then((json) => {
      productList = json;
    });
  return productList;
}

export function addNewProduct(product: ProductType) {
  const products_api_url = import.meta.env.VITE_REST_API_SERVER_URL + "/products";
  fetch(products_api_url, {
    method: "POST",
    body: JSON.stringify(product),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err.message);
    });
}
