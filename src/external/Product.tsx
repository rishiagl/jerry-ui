import { ProductType } from "../components/Product";

export async function getAllProducts(): Promise<ProductType[]> {
  let productList: ProductType[] = [];
  await fetch("http://127.0.0.1:8080/products")
    .then((res) => res.json())
    .then((json) => {
      productList = json;
    });
  return productList;
}

export function addNewProduct(product: ProductType) {
  fetch("http://127.0.0.1:8080/products", {
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
