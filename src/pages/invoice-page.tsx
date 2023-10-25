import { useCallback, useEffect, useState } from "react";
import { MainNavbar } from "../components/main-navbar";
import { useNavigate } from "react-router-dom";
import Company, { CompanyType } from "../components/Company";
import Customer, { CustomerType } from "../components/Customer";
import Product, { ProductType } from "../components/Product";
import React from "react";
import { LimitedLetterTextarea } from "../components/TextArea";
import { addNewInvoice } from "../external/invoice"
import { useAuth0 } from "@auth0/auth0-react";

export type ItemType = {
  product: ProductType;
  description: string;
  qty: number;
  rate: number;
};

export function InvoicePage() {
  const [company, setCompany] = useState<CompanyType>({});
  const [customer, setCustomer] = useState<CustomerType>({});
  const [item_list, setitem_list] = useState<ItemType[]>([]);
  const [narration, setNarration] = useState("");
  const [taxable_value, setTaxable_value] = useState(0);
  const [cgst, setCgst] = useState(0);
  const [sgst, setSgst] = useState(0);
  const [igst, setIgst] = useState(0);
  const [amount, setAmount] = useState(0);
  const [finance_name, setFinancename] = useState("");
  const [dp, setDp] = useState(0);
  const [emi, setEmi] = useState(0);
  const [finance_duration_in_months, setFinanceDurationInMonths] = useState(0);
  const [amount_paid, setAmountPaid] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const company = JSON.parse(localStorage.getItem("company") || "{}");
    if (company) {
      setCompany(company);
    } else {
      navigate("/pagenotfound");
    }
  }, []);

  useEffect(() => {
    let tv = 0,
      c = 0,
      s = 0,
      ig = 0,
      i = 0;
    while (i < item_list.length) {
      let itemTv =
        item_list[i].qty *
        (item_list[i].rate / (1 + item_list[i].product.tax_rate / 100));
      tv += itemTv;
      if (company.state != customer.state) {
        ig += itemTv * (item_list[i].product.tax_rate / 100);
      } else {
        c += itemTv * (item_list[i].product.tax_rate / 200);
        s += itemTv * (item_list[i].product.tax_rate / 200);
      }
      i++;
    }
    setTaxable_value(parseFloat(tv.toFixed(2)));
    setCgst(parseFloat(c.toFixed(2)));
    setSgst(parseFloat(s.toFixed(2)));
    setIgst(parseFloat(ig.toFixed(2)));
    setAmount(parseFloat((tv + c + s + ig).toFixed(2)));
  }, [item_list, customer]);

  const handleReset = () => {
    navigate(0);
  }

  const { getAccessTokenSilently } = useAuth0();
  async function HandleSubmit() {
    if (
      company != undefined &&
      customer != undefined &&
      item_list.length > 0
    ) {
      const accessToken = await getAccessTokenSilently();
      await addNewInvoice(accessToken, {
        id: 0,
        company: company,
        customer: customer,
        taxable_value: taxable_value,
        cgst: cgst,
        sgst: sgst,
        igst: igst,
        amount: amount,
        amount_paid: amount_paid,
        finance_name: finance_name,
        finance_duration_in_months: finance_duration_in_months,
        dp: dp,
        emi: emi,
        item_list: item_list,
        narration: narration
      });
      handleReset()
    }
  }


  return (
    <div className="lg:h-[calc(100vh-40px)]">
      <MainNavbar tittle={company.name}></MainNavbar>
      <div className="p-2 pb-3 mx-auto w-full h-full bg-zinc-400">
        <div className="flex lg:flex-row lg:h-4/6 lg:justify-around flex-col bg-zinc-400 font-semibold">
          <div className="lg:w-1/3 m-1 p-2 rounded bg-zinc-200">
            <Customer customer={customer} setCustomer={setCustomer}></Customer>
          </div>
          <div className="lg:w-1/3 m-1 p-2 flex justify-center rounded bg-zinc-200">
            <Product itemList={item_list} setitemList={setitem_list}></Product>
          </div>
          <div className="lg:w-1/3 m-1 p-2 flex flex-col justify-left rounded bg-zinc-200">
            <div className="flex justify-between mb-2">
              <h4>Summary</h4>
            </div>

            <div className="flex flex-col justify-between bg-zinc-100 rounded p-2 font-semibold m-1">
              <div className="flex flex-row w-full">
                <div className="w-3/5">Taxable Value</div>
                <div className="w-2/5">{taxable_value}</div>
              </div>
              <div className="flex flex-row w-full">
                <div className="w-3/5">CGST</div>
                <div className="w-2/5">{cgst}</div>
              </div>
              <div className="flex flex-row w-full">
                <div className="w-3/5">SGST</div>
                <div className="w-2/5">{sgst}</div>
              </div>
              <div className="flex flex-row w-full">
                <div className="w-3/5">IGST</div>
                <div className="w-2/5">{igst}</div>
              </div>
            </div>

            {/* Grand Total */}
            <div className="flex flex-col justify-between bg-zinc-100 rounded p-2 font-semibold m-1">
              <div className="flex flex-row w-full">
                <div className="w-3/5">Grand Total</div>
                <div className="w-2/5">{amount}</div>
              </div>
            </div>

            {/* Amount Paid and Due */}
            <div className="flex flex-col justify-between bg-zinc-100 rounded p-2 font-semibold m-1">
              <div className="flex flex-row w-full">
                <div className="w-3/5">Amount Paid</div>
                <div className="w-2/5">{amount_paid}</div>
              </div>
              <div className="flex flex-row w-full">
                <div className="w-3/5">Due</div>
                <div className="w-2/5">{amount - amount_paid}</div>
              </div>
            </div>

            <div className="flex justify-around m-4">
              <button className="px-4 py-2 bg-zinc-300 rounded" onClick={handleReset}>Reset</button>
              <button className="px-4 py-2 bg-zinc-400 rounded" onClick={HandleSubmit}>Submit</button>
            </div>
          </div>
        </div>
        <div className="flex lg:flex-row lg:h-2/6 lg:justify-around flex-col bg-zinc-400">
          <div className="lg:w-1/3 m-1 p-2 flex flex-col justify-left rounded bg-zinc-200">
            <div className="flex justify-between mb-1">
              <h4>Finance Details</h4>
            </div>
            <div className="flex flex-col justify-between bg-zinc-100 rounded p-2 font-semibold m-1">
              <div className="flex flex-row w-full">
                <div className="w-2/5">Financer Name:</div>
                <div className="w-3/5">
                  <input
                    className="border-2 border-zinc-400 rounded"
                    type="text"
                    id="finance_name"
                    value={finance_name || ""}
                    onChange={(event) => setFinancename(event.target.value)}
                  ></input>
                </div>
              </div>
              <div className="flex flex-row w-full">
                <div className="w-2/5">Down Payment:</div>
                <div className="w-3/5">
                  <input
                    className="border-2 border-zinc-400 rounded"
                    type="number"
                    id="dp"
                    value={dp || 0}
                    onChange={(event) => setDp(parseInt(event.target.value))}
                  ></input>
                </div>
              </div>
              <div className="flex flex-row w-full">
                <div className="w-2/5">EMI:</div>
                <div className="w-3/5">
                  <input
                    className="border-2 border-zinc-400 rounded"
                    type="number"
                    id="emi"
                    value={emi || 0}
                    onChange={(event) => setEmi(parseInt(event.target.value))}
                    required
                  ></input>
                </div>
              </div>
              <div className="flex flex-row w-full">
                <div className="w-2/5">Duration:</div>
                <div className="w-3/5">
                  <input
                    className="border-2 border-zinc-400 rounded"
                    type="number"
                    id="finance_duration_in_months"
                    value={finance_duration_in_months || 0}
                    onChange={(event) =>
                      setFinanceDurationInMonths(parseInt(event.target.value))
                    }
                    required
                  ></input>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:w-1/3 m-1 p-2 flex flex-col justify-left rounded bg-zinc-200">
            <div className="flex justify-between mb-1">
              <h4>Payments</h4>
            </div>
            <div className="flex justify-center">
              <input
                className="border-2 border-zinc-400 rounded"
                type="number"
                id="amount_paid"
                value={amount_paid || 0}
                onChange={(event) => setAmountPaid(parseInt(event.target.value))}
              ></input>
            </div>
          </div>
          <div className="lg:w-1/3 m-1 p-2 flex flex-col justify-left rounded bg-zinc-200">
            <div className="flex justify-between mb-1">
              <h4>Narration</h4>
            </div>
            <LimitedLetterTextarea
              rows={5}
              value={narration}
              setValue={setNarration}
              limit={100}
              placeholder={"Write your additional details here..."}
              className="block p-2.5 w-full h-fixed text-sm text-zinc-900 bg-zinc-50 rounded-lg border border-zinc-300 focus:ring-zinc-500 focus:border-zinc-500"
            ></LimitedLetterTextarea>
          </div>
        </div>
      </div>
    </div>
  );
}
