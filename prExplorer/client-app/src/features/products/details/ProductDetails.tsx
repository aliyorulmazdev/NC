import React, { useEffect } from "react";
import { Button, Card, Image } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { observer } from "mobx-react-lite";
import { Link, useParams } from "react-router-dom";


export default observer(function ProductDetails() {

  const {productStore} = useStore();
  const {selectedProduct: product, loadProduct,loadingInitial } = productStore;
  const {id} = useParams();

  useEffect(() => {
    if (id) loadProduct(id);
  }, [id, loadProduct])

  if (loadingInitial || !product) return <LoadingComponent />;

  return (
    <Card fluid>
      <Image src={`${product.thumbnail}`} />
      <Card.Content>
        <Card.Header>{product.title}</Card.Header>
        <Card.Meta>Price: {product.price} - Discount : {product.discountPercentage} - Rating: {product.rating}</Card.Meta>
        <Card.Description>{product.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths="2">
          <Button as={Link} to={`/manage/${product.id}`} basic color="blue" content="Edit" />
          <Button as={Link} to='/products' basic color="grey" content="Cancel" />
        </Button.Group>
      </Card.Content>
    </Card>
  );
})