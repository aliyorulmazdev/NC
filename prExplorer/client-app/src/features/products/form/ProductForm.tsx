import React, { ChangeEvent, useEffect, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Product } from "../../../app/models/product";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { v4 as uuid } from "uuid";

export default observer(function ProductForm() {
  const { productStore } = useStore();
  const {
    // selectedProduct,
    createProduct,
    updateProduct,
    loading,
    loadProduct,
    loadingInitial,
  } = productStore;
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product>({
    id: "",
    title: "",
    description: "",
    price: 0,
    discountPercentage: 0,
    rating: 0,
    stock: 0,
    brand: "",
    category: "",
    thumbnail: "",
  });

  useEffect(() => {
    if (id) loadProduct(id).then((product) => setProduct(product!));
  }, [id, loadProduct]);

  function handleSubmit() {
    if (!product.id) {
      product.id = uuid();
      createProduct(product).then(() => navigate(`/products/${product.id}`));
    } else {
      updateProduct(product).then(() => navigate(`/products/${product.id}`));
    }
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });
  }

  if (loadingInitial) return <LoadingComponent content="Loading product..." />;

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit} autoComplete="off">
        <Form.Input
          placeholder="Title"
          name="title"
          value={product.title}
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="Description"
          name="description"
          value={product.description}
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="Price"
          name="price"
          value={product.price}
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="DiscountPercentage"
          name="discountPercentage"
          value={product.discountPercentage}
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="Rating"
          name="rating"
          value={product.rating}
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="Stock"
          name="stock"
          value={product.stock}
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="Brand"
          name="brand"
          value={product.brand}
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="Category"
          name="category"
          value={product.category}
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="Thumbnail"
          name="thumbnail"
          value={product.thumbnail}
          onChange={handleInputChange}
        />
        <Button
          loading={loading}
          floated="right"
          positive
          type="submit"
          content="Submit"
          onChange={handleInputChange}
        />
        <Button
          as={Link}
          to="/products"
          floated="right"
          type="button"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
});
