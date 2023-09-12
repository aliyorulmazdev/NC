import { observer } from "mobx-react-lite";
import React from "react";
import { Button, Header, Item, Segment, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { Category } from "../../../app/models/category";

const categoryImageStyle = {
  filter: "brightness(50%)",
  width: "100%",
  height: "300px",
  objectFit: "cover",
};

const categoryImageTextStyle = {
  position: "absolute",
  bottom: "5%",
  left: "5%",
  width: "100%",
  height: "auto",
  color: "white",
};

interface Props {
  category: Category;
}

export default observer(function CategoryDetailedHeader({ category }: Props) {
  return (
    <Segment.Group>
      <Segment basic attached="top" style={{ padding: "0" }}>
        <Image src={`${category.thumbnail}`} fluid style={categoryImageStyle} />
        <Segment style={categoryImageTextStyle} basic>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size="huge"
                  content={category.title}
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
        <Button color="teal">Follow category</Button>
        <Button>Unfollow category</Button>
        <Button
          color="green"
          floated="right"
          as={Link}
          to={`/manageCategory/${category.id}`}
        >
          Manage Category
        </Button>
      </Segment>
    </Segment.Group>
  );
});
