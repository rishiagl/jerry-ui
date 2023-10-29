import { useEffect, useState } from "react";
import Product, { ProductType } from "../Product";
import { Modal } from "react-bootstrap";
import Select from "react-select";
import AddNewProductModal from "./new-product-modal";
import { getProduct } from "../../external/Product";
import { useAuth0 } from "@auth0/auth0-react";
import { ItemType } from "../../pages/invoice-page";

type Props = {
  show: boolean;
  setShow: (value: boolean) => void;
  itemList: ItemType[];
  setitemList: (ItemTypeList: ItemType[]) => void;
};

export function AddProductModal(props: Props) {
  const [product, setProduct] = useState<ProductType>();
  const [description, setDescription] = useState<string>();
  const [qty, setQty] = useState<number>();
  const [rate, setRate] = useState<number>();
  const [allProducts, setAllProducts] = useState<ProductType[]>([]);
  const [showAddNewProductModal, setShowAddNewProductModal] = useState(false);

  const { user } = useAuth0();
  const { getAccessTokenSilently } = useAuth0();

  if (!user) {
    return null;
  }

  useEffect(() => {
    let isMounted = true;

    const getProducts = async () => {
      const accessToken = await getAccessTokenSilently();
      const { data, error } = await getProduct(accessToken);

      if (!isMounted) {
        return;
      }

      if (data) {
        setAllProducts(data);
      }

      if (error) {
        console.log("External API not working");
      }
    };

    getProducts();
    setProduct(undefined);
    setQty(undefined);
    setRate(undefined);
    setDescription(undefined);

    return () => {
      isMounted = false;
    };
  }, [getAccessTokenSilently, props.show, showAddNewProductModal]);

  const handleClose = () => props.setShow(false);

  function HandleSubmit() {
    if (product != undefined && qty != undefined && qty > 0 && rate != undefined && rate > 0) {
      props.setitemList([
        ...props.itemList,
        {
          product: product,
          description: description || "",
          qty: qty,
          rate: rate,
        },
      ]);

      handleClose();
    }
  }

  function onProductSelect(product: ProductType) {
    setProduct(product);
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
              Id: {product?.id}
              <br />
              Name: {product?.name}
              <br />
              HSN: {product?.hsn}
              <br />
              Tax_Rate: {product?.tax_rate}
              <br />
            </p>
          </div>
          <div className="mb-3">
            <label className="form-label">Description:</label>
            <input
              className="form-control"
              type="text"
              id="description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              required
            ></input>
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
