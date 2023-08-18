import React, { SyntheticEvent, useState } from "react";
import { Product } from "../../../app/models/product";
import { Button, Item, Label, Segment } from "semantic-ui-react";

interface Props {
  products: Product[];
  selectProduct: (id: string) => void;
  deleteProduct: (id: string) => void;
  submitting: boolean;
}

export default function ProductList({ products, selectProduct, deleteProduct, submitting }: Props) {

  const [target, setTarget] = useState('');

  function handleProductDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
    setTarget(e.currentTarget.name);
    deleteProduct(id);
  }

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
                <Button name = {product.id} loading={submitting && target === product.id} onClick={(e) => handleProductDelete(e, product.id)} floated="right" content='delete' color='red'/>
                <Label basic content={product.category} />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
}
