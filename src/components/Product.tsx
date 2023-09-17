import { Fragment, useState } from "react";
import { AddProductModal } from "./AddProductModal";
import { InvoiceItem } from "../routes/Invoice";

export type ProductType = {
  id?: number;
  name?: string;
  hsn?: string;
  tax_rate?: number;
};

type Props = {
  invoiceItemList: InvoiceItem[];
  setInvoiceItemList: (invoiceItemLIst: InvoiceItem[]) => void;
};

export default function Product(props: Props) {
  const [showAddProductModal, setShowAddProductModal] = useState(false);

  return (
    <Fragment>
      <AddProductModal
        show={showAddProductModal}
        setShow={setShowAddProductModal}
        invoiceItemList={props.invoiceItemList}
        setInvoiceItemList={props.setInvoiceItemList}
      ></AddProductModal>
      <div>
        <h3>
          Product List &nbsp;
          <button
            className="btn btn-success"
            onClick={(event) => {
              setShowAddProductModal(true);
            }}
          >
            Add
          </button>
        </h3>

        {props.invoiceItemList.map((invoiceItem) => (
          <div>
            <p>
              Name: {invoiceItem.product.name}
              <br />
              HSN: {invoiceItem.product.hsn}
              <br />
              Tax_rate: {invoiceItem.product.tax_rate}
              <br />
              QTY: {invoiceItem.qty}
              <br />
              Rate: {invoiceItem.rate}
              <br />
              <button
                className="btn btn-danger"
                onClick={() => {
                  props.setInvoiceItemList(
                    props.invoiceItemList.filter(
                      (p) => p.product !== invoiceItem.product
                    )
                  );
                }}
              >
                Delete
              </button>
            </p>
          </div>
        ))}
      </div>
    </Fragment>
  );
}
