import React from "react";
import { Grid, GridColumn } from "semantic-ui-react";
import ProductList from "./ProductList";
import ProductDetails from "../details/ProductDetails";
import ProductForm from "../form/ProductForm";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";


export default observer(function ProductDashboard() {

  const {productStore} = useStore();
  const {selectedProduct, editMode} = productStore;

  return (
    <Grid>
      <GridColumn width="10">
        <ProductList />
      </GridColumn>
      <GridColumn width="6">
        {selectedProduct && !editMode &&
        <ProductDetails />}
        {editMode &&
        <ProductForm />}
      </GridColumn>
    </Grid>
  );
})