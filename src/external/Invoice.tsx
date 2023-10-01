import { CustomerType } from "../components/Customer";
import { InvoiceItem } from "../routes/Invoice";

export async function addInvoice(
  customer: CustomerType,
  invoiceItemLIst: InvoiceItem[]
): Promise<number> {
  const invoice_api_url = import.meta.env.VITE_REST_API_SERVER_URL + "/invoice";
  let status: number = 0;
  await fetch(invoice_api_url, {
    method: "POST",
    body: JSON.stringify({
      'customer': customer,
      'invoiceItemJSONS': invoiceItemLIst,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.status)
    .then((data) => {
      if (data == 200){
        status = 1;
      }
      else status = 0;
    })
    .catch((err) => {
      console.log(err.message);
      return 0;
    });
    return status;
}
