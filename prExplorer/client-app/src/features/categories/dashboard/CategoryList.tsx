import React, { SyntheticEvent, useState } from "react";
import { Button, Segment, Table, Input, Image } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

import { Category } from "../../../app/models/category";

export default observer(function CategoryList() {
  const { categoryStore } = useStore();
  const { deleteCategory, categoriesSortedByName, loading } = categoryStore;

  const [target, setTarget] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleCategoryDelete = async (
    e: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    setTarget(e.currentTarget.name);
    await deleteCategory(id);
  };

  const [column, setColumn] = useState<keyof Category | null>(null);
  const [direction, setDirection] = useState<
    "ascending" | "descending" | undefined
  >(undefined);

  const handleSort = (clickedColumn: keyof Category) => () => {
    if (column !== clickedColumn) {
      setColumn(clickedColumn);
      setDirection("ascending");
      categoriesSortedByName.sort((a, b) =>
        a[clickedColumn].toString().localeCompare(b[clickedColumn].toString())
      );
    } else {
      setDirection(direction === "ascending" ? "descending" : "ascending");
      categoriesSortedByName.reverse();
    }
  };

  const filteredCategories = categoriesSortedByName.filter((category) =>
    category.title.toLowerCase().includes(searchTerm.toLowerCase())
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
            <Table.HeaderCell>Thumbnail</Table.HeaderCell> {/* Yeni sütun */}
            <Table.HeaderCell>View</Table.HeaderCell>
            <Table.HeaderCell>Delete</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {filteredCategories.map((category) => (
            <Table.Row key={category.id}>
              <Table.Cell>{category.title}</Table.Cell>
              <Table.Cell style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Image src={category.thumbnail} size="mini" circular style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }} /> {/* Thumbnail gösterme */}
              </Table.Cell>
              <Table.Cell>
                <Button
                  as={Link}
                  to={`/categories/${category.id}`}
                  content="View"
                  color="green"
                  size='mini'
                  circular
                />
              </Table.Cell>
              <Table.Cell>
                <Button
                  name={category.id}
                  loading={loading && target === category.id}
                  onClick={(e) => handleCategoryDelete(e, category.id)}
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
