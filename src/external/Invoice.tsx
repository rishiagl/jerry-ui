import { CustomerType } from "../components/Customer";
import { InvoiceItem } from "../routes/Invoice";

export function addInvoice(
  customer: CustomerType,
  invoiceItemLIst: InvoiceItem[]
) {
  fetch("http://127.0.0.1:8080/invoice", {
    method: "POST",
    body: JSON.stringify({
      'customer': customer,
      'invoiceItemJSONS': invoiceItemLIst,
    }),
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
