import { Fragment, useState } from "react";
import Customer from "../components/Customer";
import Product, { ProductType } from "../components/Product";
import { CustomerType } from "../components/Customer";
import CustomerModal from "../components/modals/customer-modal";
import { useNavigate } from "react-router-dom";
import { addInvoice } from "../external/Invoice";
import { Modal, Button } from "react-bootstrap";

export type InvoiceItem = {
  product: ProductType;
  qty?: number;
  rate?: number;
};
export default function Invoice() {
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [customer, setCustomer] = useState<CustomerType>({});
  const [invoiceItemList, setInvoiceitemList] = useState<InvoiceItem[]>([]);

  const handleClose = () => setShowAlertModal(false);

  const navigate = useNavigate();
  const handleBack = () => navigate("/");
  const handleSubmit = () => {
    addInvoice(customer, invoiceItemList)
      .then((res) => {
        if (res == 1) {
          setCustomer({});
          setInvoiceitemList([]);
          setAlertMessage("Invoice SuccessFully Added!");
          setShowAlertModal(true);
        } else {
          setAlertMessage("Error: Invoice Not Added");
          setShowAlertModal(true);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <Fragment>
      <Modal show={showAlertModal} onHide={handleClose} keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Alert!</Modal.Title>
        </Modal.Header>
        <Modal.Body>{alertMessage}</Modal.Body>
      </Modal>
      <div className="container">
        <h1>
          Invoice&nbsp;
          <button className="btn btn-primary" onClick={handleSubmit}>
            submit
          </button>
          &nbsp;
          <button className="btn btn-danger" onClick={handleBack}>
            back
          </button>
        </h1>
        <Customer customer={customer} setCustomer={setCustomer}></Customer>
        <Product
          invoiceItemList={invoiceItemList}
          setInvoiceItemList={setInvoiceitemList}
        ></Product>
      </div>
    </Fragment>
  );
}
