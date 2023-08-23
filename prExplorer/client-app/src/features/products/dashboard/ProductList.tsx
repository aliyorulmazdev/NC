import React, { SyntheticEvent, useState } from "react";
import { Button, Segment, Table, Input, Image } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Product } from "../../../app/models/product";

export default observer(function ProductList() {
  const { productStore } = useStore();
  const { deleteProduct, productsSortedByName, loading } = productStore;

  const [target, setTarget] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleProductDelete = async (
    e: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    setTarget(e.currentTarget.name);
    await deleteProduct(id);
  };

  const [column, setColumn] = useState<keyof Product | null>(null);
  const [direction, setDirection] = useState<
    "ascending" | "descending" | undefined
  >(undefined);

  const handleSort = (clickedColumn: keyof Product) => () => {
    if (column !== clickedColumn) {
      setColumn(clickedColumn);
      setDirection("ascending");
      productsSortedByName.sort((a, b) =>
        a[clickedColumn].toString().localeCompare(b[clickedColumn].toString())
      );
    } else {
      setDirection(direction === "ascending" ? "descending" : "ascending");
      productsSortedByName.reverse();
    }
  };

  const filteredProducts = productsSortedByName.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Segment>
      <Input
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        action={{
          icon: "search",
          onClick: () => setSearchTerm(""),
        }}
      />
      <Table sortable celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              sorted={column === "title" ? direction : undefined}
              onClick={handleSort("title")}
            >
              Name
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === "price" ? direction : undefined}
              onClick={handleSort("price")}
            >
              Price
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === "discountPercentage" ? direction : undefined}
              onClick={handleSort("discountPercentage")}
            >
              Discount
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === "rating" ? direction : undefined}
              onClick={handleSort("rating")}
            >
              Rating
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === "stock" ? direction : undefined}
              onClick={handleSort("stock")}
            >
              Stock
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === "category" ? direction : undefined}
              onClick={handleSort("category")}
            >
              Category
            </Table.HeaderCell>
            <Table.HeaderCell>Thumbnail</Table.HeaderCell> {/* Yeni sütun */}
            <Table.HeaderCell>View</Table.HeaderCell>
            <Table.HeaderCell>Delete</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {filteredProducts.map((product) => (
            <Table.Row key={product.id}>
              <Table.Cell>{product.title}</Table.Cell>
              <Table.Cell>{product.price}</Table.Cell>
              <Table.Cell>{product.discountPercentage}</Table.Cell>
              <Table.Cell>{product.rating}</Table.Cell>
              <Table.Cell>{product.stock}</Table.Cell>
              <Table.Cell>{product.category}</Table.Cell>
              <Table.Cell style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Image src={product.thumbnail} size="mini" circular style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }} /> {/* Thumbnail gösterme */}
              </Table.Cell>
              <Table.Cell>
                <Button
                  as={Link}
                  to={`/products/${product.id}`}
                  content="View"
                  color="green"
                  size='mini'
                  circular
                />
              </Table.Cell>
              <Table.Cell>
                <Button
                  name={product.id}
                  loading={loading && target === product.id}
                  onClick={(e) => handleProductDelete(e, product.id)}
                  content="Delete"
                  color="red"
                  size='mini'
                  circular
                />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Segment>
  );
});
