import React from "react";
import { Button, Card, Image } from "semantic-ui-react";
import { Product } from "../../../app/models/product";

interface Props {
  product: Product;
  cancelSelectedProduct: () => void;
  openForm: (id: string) => void;
}

export default function ProductDetails({ product, cancelSelectedProduct, openForm }: Props) {
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
          <Button onClick={() => openForm(product.id)} basic color="blue" content="Edit" />
          <Button onClick={cancelSelectedProduct} basic color="grey" content="Cancel" />
        </Button.Group>
      </Card.Content>
    </Card>
  );
}
