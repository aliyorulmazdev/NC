import { observer } from "mobx-react-lite";
import React from "react";
import { Button, Header, Item, Segment, Image } from "semantic-ui-react";
import { Product } from "../../../app/models/product";
import { Link } from "react-router-dom";

const productImageStyle = {
  filter: "brightness(50%)",
  width: "100%",
  height: "300px",
  objectFit: "cover",
};

const productImageTextStyle = {
  position: "absolute",
  bottom: "5%",
  left: "5%",
  width: "100%",
  height: "auto",
  color: "white",
};

interface Props {
  product: Product;
}

export default observer(function ProductDetailedHeader({ product }: Props) {
  return (
    <Segment.Group>
      <Segment basic attached="top" style={{ padding: "0" }}>
        <Image src={`${product.thumbnail}`} fluid style={productImageStyle} />
        <Segment style={productImageTextStyle} basic>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size="huge"
                  content={product.title}
                  style={{ color: "white" }}
                />
                <p>
                  Created by <strong>Ali</strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>
      <Segment clearing attached="bottom">
        <Button color="teal">Follow product</Button>
        <Button>Unfollow product</Button>
        <Button
          color="green"
          floated="right"
          as={Link}
          to={`/manage/${product.id}`}
        >
          Manage Product
        </Button>
      </Segment>
    </Segment.Group>
  );
});
