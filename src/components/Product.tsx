import { Fragment, useState } from "react";
import { AddProductModal } from "./AddProductModal";

export type ProductType = {
  id: number;
  name: string;
  hsn: string;
  tax_rate: number;
};

type Props = {
  productList: ProductType[];
  setProductList: (productList: ProductType[]) => void;
};

export default function Product(props: Props) {
  const [showAddProductModal, setShowAddProductModal] = useState(false);

  return (
    <Fragment>
      <AddProductModal
        show={showAddProductModal}
        setShow={setShowAddProductModal}
        productList={props.productList}
        setProductList={props.setProductList}
      ></AddProductModal>
      <div>
        <h2>
          Product List &nbsp;
          <button
            className="btn btn-success"
            onClick={(event) => {
              setShowAddProductModal(true);
            }}
          >
            Add
          </button>
        </h2>

        {props.productList.map((product) => (
          <div>
            <p>
              Name: {product.name}
              <br />
              HSN: {product.hsn}
              <br />
              Tax_rate: {product.tax_rate}
              <br />
              <button
                onClick={() => {
                  props.setProductList(
                    props.productList.filter((p) => p.id !== product.id)
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
