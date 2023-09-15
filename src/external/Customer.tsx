import { CustomerType } from "../components/Customer";

export async function getCustomers(): Promise<CustomerType[]> {
  let customerList: CustomerType[] = [];
  await fetch("http://127.0.0.1:8080/customers")
    .then((res) => res.json())
    .then((json) => {
      customerList = json;
    });
  return customerList;
}

export function addNewCustomer(customer: CustomerType) {
  fetch("http://127.0.0.1:8080/customers", {
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
