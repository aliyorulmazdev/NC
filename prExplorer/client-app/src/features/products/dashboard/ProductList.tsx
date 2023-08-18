import React from "react";
import { Product } from "../../../app/models/product";
import { Button, Item, Label, Segment } from "semantic-ui-react";

interface Props {
  products: Product[];
  selectProduct: (id: string) => void;
  deleteProduct: (id: string) => void;
}

export default function ProductList({ products, selectProduct, deleteProduct }: Props) {
  return (
    <Segment>
      <Item.Group divided>
        {products.map((product) => (
          <Item key={product.id}>
            <Item.Content>
              <Item.Header as="a">{product.title}</Item.Header>
              <Item.Meta>Price: {product.price} - Discount : {product.discountPercentage} - Rating: {product.rating}</Item.Meta>
              <Item.Description>
                <div>{product.description}</div>
                <div>STOCK: {product.stock}</div>
              </Item.Description>
              <Item.Extra>
                <Button onClick={() => selectProduct(product.id)} floated="right" content='view' color='blue'/>
                <Button onClick={() => deleteProduct(product.id)} floated="right" content='delete' color='red'/>
                <Label basic content={product.category} />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
}
