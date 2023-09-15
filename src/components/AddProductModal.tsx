import { useEffect, useState } from "react";
import Product, { ProductType } from "./Product";
import { Modal } from "react-bootstrap";
import Select from "react-select";
import AddNewProductModal from "./AddNewProductModal";
import { InvoiceItem } from "../routes/Invoice";
import { getAllProducts } from "../external/Product";

type Props = {
  show: boolean;
  setShow: (value: boolean) => void;
  invoiceItemList: InvoiceItem[];
  setInvoiceItemList: (invoiceItemList: InvoiceItem[]) => void;
};

export function AddProductModal(props: Props) {
  const [id, setId] = useState<number>();
  const [name, setName] = useState<string>();
  const [hsn, setHsn] = useState<string>();
  const [tax_rate, setTax_rate] = useState<number>();
  const [qty, setQty] = useState<number>();
  const [rate, setRate] = useState<number>();
  const [allProducts, setAllProducts] = useState<ProductType[]>([]);
  const [showAddNewProductModal, setShowAddNewProductModal] = useState(false);

  useEffect(() => {
    getAllProducts()
      .then((res) => {
        console.log(res);
        setAllProducts(res);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [showAddNewProductModal]);

  const handleClose = () => props.setShow(false);

  function HandleSubmit() {
    if (id != undefined && qty != undefined && rate != undefined) {
      props.setInvoiceItemList([
        ...props.invoiceItemList,
        {
          product: { id: id, name: name, hsn: hsn, tax_rate: tax_rate },
          qty: qty,
          rate: rate,
        },
      ]);

      handleClose();
    }
  }

  function onProductSelect(product: ProductType) {
    setId(product.id || 0);
    setName(product.name || "");
    setHsn(product.hsn || "");
    setTax_rate(product.tax_rate || 0);
  }
  function PropToSelectList(products: ProductType[]) {
    return products.map((opt: ProductType) => ({
      label: opt!.name,
      value: opt,
    }));
  }

  return (
    <>
      <AddNewProductModal
        show={showAddNewProductModal}
        setShow={setShowAddNewProductModal}
      ></AddNewProductModal>
      <Modal
        show={props.show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Add Product &nbsp;
            <button
              className="btn btn-success"
              onClick={(event) => {
                setShowAddNewProductModal(true);
              }}
            >
              New
            </button>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Select
            options={PropToSelectList(allProducts)}
            onChange={(opt) => onProductSelect(opt!.value)}
          />{" "}
          &nbsp;
          <div className="mb-3">
            <p>
              Id: {id}
              <br />
              Name: {name}
              <br />
              HSN: {hsn}
              <br />
              Tax_Rate: {tax_rate}
              <br />
            </p>
          </div>
          <div className="mb-3">
            <label className="form-label">Qty:</label>
            <input
              className="form-control"
              type="number"
              id="qty"
              value={qty}
              onChange={(event) => setQty(parseInt(event.target.value))}
              required
            ></input>
          </div>
          <div className="mb-3">
            <label className="form-label">Rate:</label>
            <input
              className="form-control"
              type="number"
              id="rate"
              value={rate}
              onChange={(event) => setRate(parseInt(event.target.value))}
              required
            ></input>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={(event) => HandleSubmit()}
          >
            Submit
          </button>
        </Modal.Body>
      </Modal>
    </>
  );
}
