import React, { SyntheticEvent, useState } from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";

export default observer(function ProductList() {
  const { productStore } = useStore();
  const { deleteProduct, productsSortedByName, loading } = productStore;

  const [target, setTarget] = useState("");

  function handleProductDelete(
    e: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) {
    setTarget(e.currentTarget.name);
    deleteProduct(id);
  }

  return (
    <Segment>
      <Item.Group divided>
        {productsSortedByName.map((product) => (
          <Item key={product.id}>
            <Item.Content>
              <Item.Header as="a">{product.title}</Item.Header>
              <Item.Meta>
                Price: {product.price} - Discount : {product.discountPercentage}{" "}
                - Rating: {product.rating}
              </Item.Meta>
              <Item.Description>
                <div>{product.description}</div>
                <div>STOCK: {product.stock}</div>
              </Item.Description>
              <Item.Extra>
                <Button
                  onClick={() => productStore.selectProduct(product.id)}
                  floated="right"
                  content="view"
                  color="blue"
                />
                <Button
                  name={product.id}
                  loading={loading && target === product.id}
                  onClick={(e) => handleProductDelete(e, product.id)}
                  floated="right"
                  content="delete"
                  color="red"
                />
                <Label basic content={product.category} />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
});
