import React, { useEffect } from "react";
import { Grid, GridColumn } from "semantic-ui-react";
import ProductList from "./ProductList";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import LoadingComponent from "../../../app/layout/LoadingComponent";


export default observer(function ProductDashboard() {

  const {productStore} = useStore();
  const {loadProducts, productRegistry} = productStore;

  useEffect(() => {
    if (productRegistry.size <= 1) productStore.loadProducts();
  }, [loadProducts, productRegistry, productStore]);

  if (productStore.loadingInitial) return <LoadingComponent content="Loading App" />;

  return (
    <Grid>
      <GridColumn width="15">
        <ProductList />
      </GridColumn>
    </Grid>
  );
})