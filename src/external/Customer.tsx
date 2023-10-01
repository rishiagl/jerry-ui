import { CustomerType } from "../components/Customer";

export async function getCustomers(): Promise<CustomerType[]> {
  let customerList: CustomerType[] = [];
  const customer_api_url: string = import.meta.env.VITE_REST_API_SERVER_URL + "/customers";
  await fetch(customer_api_url)
    .then((res) => res.json())
    .then((json) => {
      customerList = json;
    });
  return customerList;
}

export function addNewCustomer(customer: CustomerType) {
  const customer_api_url = import.meta.env.VITE_REST_API_SERVER_URL + "/customers";
  fetch(customer_api_url, {
    method: "POST",
    body: JSON.stringify(customer),
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
