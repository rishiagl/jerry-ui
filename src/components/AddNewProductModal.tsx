import { Modal, Button } from "react-bootstrap";
import { useState } from "react";
import { CustomerType } from "./Customer";
import { ProductType } from "./Product";

interface Props {
  show: boolean;
  setShow: (value: boolean) => void;
  onSubmit: (product: ProductType) => void;
}

export default function AddNewProductModal(props: Props) {
  const [name, setName] = useState("");
  const [hsn, setHsn] = useState("");
  const [tax_rate, setTax_rate] = useState(0);

  const handleClose = () => props.setShow(false);

  function HandleSubmit() {
    props.onSubmit({ id: 0, name, hsn, tax_rate });
    handleClose();
  }

  return (
    <>
      <Modal
        show={props.show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add New Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label className="form-label">Name:</label>
            <input
              type="text"
              id="name"
              className="form-control"
              value={name}
              onChange={(event) => setName(event.target.value)}
            ></input>
          </div>

          <div className="mb-3">
            <label className="form-label">HSN:</label>
            <input
              className="form-control"
              type="text"
              id="hsn"
              maxLength={8}
              value={hsn}
              onChange={(event) => setHsn(event.target.value)}
            ></input>
          </div>

          <div className="mb-3">
            <label className="form-label">Tax Rate:</label>
            <input
              className="form-control"
              type="number"
              id="tax_rate"
              value={tax_rate}
              onChange={(event) => setTax_rate(parseInt(event.target.value))}
            ></input>
          </div>

          <div className="mb-3">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={(event) => HandleSubmit()}
            >
              Submit
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}