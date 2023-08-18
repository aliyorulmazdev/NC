import React from "react";
import { Grid, GridColumn } from "semantic-ui-react";
import { Product } from "../../../app/models/product";
import ProductList from "./ProductList";
import ProductDetails from "../details/ProductDetails";
import ProductForm from "../form/ProductForm";

interface Props {
  products: Product[];
  selectedProduct: Product | undefined;
  selectProduct: (id: string) => void;
  cancelSelectedProduct: () => void;
  editMode: boolean;
  openForm: (id: string) => void;
  closeForm: () => void;
  createOrEdit: (product: Product) => void;
  deleteProduct: (id: string) => void;
}

export default function ProductDashboard({ products, selectProduct, selectedProduct, cancelSelectedProduct, editMode, openForm, closeForm, createOrEdit, deleteProduct}: Props) {
  return (
    <Grid>
      <GridColumn width="10">
        <ProductList products={products} selectProduct= {selectProduct} deleteProduct={deleteProduct} />
      </GridColumn>
      <GridColumn width="6">
        {selectedProduct && !editMode &&
        <ProductDetails
        product={selectedProduct}
        cancelSelectedProduct={cancelSelectedProduct}
        openForm={openForm}
        />}
        {editMode &&
        <ProductForm closeForm={closeForm} product={selectedProduct} createOrEdit={createOrEdit}/>}
      </GridColumn>
    </Grid>
  );
}
