import { useState } from "react";
import Product, { ProductType } from "./Product";
import { Modal } from "react-bootstrap";
import Select from "react-select";
import AddNewProductModal from "./AddNewProductModal";

type Props = {
  show: boolean;
  setShow: (value: boolean) => void;
  productList: ProductType[];
  setProductList: (productList: ProductType[]) => void;
};

export function AddProductModal(props: Props) {
  const [id, setId] = useState<number>();
  const [name, setName] = useState<string>();
  const [hsn, setHsn] = useState<string>();
  const [tax_rate, setTax_rate] = useState<number>();
  const [allProducts, setAllProducts] = useState<ProductType[]>([
    {
      id: 0,
      name: "kjekew",
      hsn: "321421",
      tax_rate: 0,
    },
    {
      id: 1,
      name: "qebihebf",
      hsn: "ewfkewkf",
      tax_rate: 0,
    },
    {
      id: 2,
      name: "webdieb",
      hsn: "hebbew",
      tax_rate: 0,
    },
  ]);
  const [showAddNewProductModal, setShowAddNewProductModal] = useState(false);

  const handleClose = () => props.setShow(false);

  function HandleSubmit() {
    props.setProductList([
      ...props.productList,
      { id: id, name: name, hsn: hsn, tax_rate: tax_rate },
    ]);
    handleClose();
  }

  function getAllProducts() {
    // fetch("http://127.0.0.1:8080/products")
    //   .then((res) => res.json())
    //   .then((json) => {
    //     setAllProducts(json);
    //   });
  }

  function addNewProduct(customer: ProductType) {
    // fetch("http://127.0.0.1:8080/customers", {
    //   method: "POST",
    //   body: JSON.stringify(customer),
    //   headers: {
    //     "Content-type": "application/json; charset=UTF-8",
    //   },
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(data);
    //   })
    //   .catch((err) => {
    //     console.log(err.message);
    //   });
  }

  function onProductSelect(product: ProductType) {
    setId(product.id || 0);
    setName(product.name || "");
    setHsn(product.hsn || "");
    setTax_rate(product.tax_rate || 0);
  }
  function PropToSelectList(
    products: ProductType[]
  ) {
    return products.map(
      (opt: ProductType) => ({
        label: opt!.name,
        value: opt,
      })
    );
  }

  return (
    <>
    <AddNewProductModal show={showAddNewProductModal} setShow={setShowAddNewProductModal} onSubmit={addNewProduct}></AddNewProductModal>
      <Modal
        show={props.show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Add Product &nbsp;
            <button className="btn btn-primary" onClick={(event) => {}}>
              Reload
            </button>{" "}
            &nbsp;
            <button className="btn btn-success" onClick={(event) => {setShowAddNewProductModal(true)}}>
              New
            </button>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Select
            options={PropToSelectList(allProducts)}
            onChange={(opt) => onProductSelect(opt!.value)}
          />
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
