import React, { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import ProductDetailedHeader from "./ProductDetailedHeader";
import ProductDetailedInfo from "./ProductDetailedInfo";
import ProductDetailedChat from "./ProductDetailedChat";
import ProductDetailedSidebar from "./ProductDetailedSidebar";

export default observer(function ProductDetails() {
  const { productStore } = useStore();
  const {
    selectedProduct: product,
    loadProduct,
    loadingInitial,
  } = productStore;
  const { id } = useParams();

  useEffect(() => {
    if (id) loadProduct(id);
  }, [id, loadProduct]);

  if (loadingInitial || !product) return <LoadingComponent />;

  return (
    <Grid>
      <Grid.Column width={10}>
        <ProductDetailedHeader product={product} />
        <ProductDetailedInfo product={product} />
        <ProductDetailedChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <ProductDetailedSidebar />
      </Grid.Column>
    </Grid>
  );
});
