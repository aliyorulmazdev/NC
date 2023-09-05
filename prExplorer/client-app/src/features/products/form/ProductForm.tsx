import React, { useEffect, useState } from "react";
import { Button, Header, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Product } from "../../../app/models/product";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { v4 as uuid } from "uuid";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import CustomTextInput from "../../../app/common/form/CustomTextInput";
import CustomTextArea from "../../../app/common/form/CustomTextArea";
import CustomSelectInput from "../../../app/common/form/CustomSelectInput";
import { categoryOptions } from "../../../app/common/options/categoryOptions";

export default observer(function ProductForm() {
  const { productStore } = useStore();
  const {
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
    appUserId: "",
  });

  const validationScheme = Yup.object({
    title: Yup.string().required("The title field is required for product"),
    description: Yup.string().required(
      "The description is required for product"
    ),
    price: Yup.string().required("Price field is required for product"),
    stock: Yup.number().required("Stock field is required for product"),
    brand: Yup.string().required("Brand field is required for product"),
    category: Yup.string().required("Category field is required for product"),
  });

  useEffect(() => {
    if (id) loadProduct(id).then((product) => setProduct(product!));
  }, [id, loadProduct]);

  function handleFormSubmit(product: Product) {
    if (!product.id) {
      product.id = uuid();
      createProduct(product).then(() => navigate(`/products/${product.id}`));
    } else {
      updateProduct(product).then(() => navigate(`/products/${product.id}`));
    }
  }

  if (loadingInitial) return <LoadingComponent content="Loading product..." />;

  return (
    <Segment clearing>
      <Header  content='Product Details' sub color='orange'/>
      <Formik
        validationSchema={validationScheme}
        initialValues={product}
        enableReinitialize
        onSubmit={(values) => handleFormSubmit(values)}
      >
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <Form
            className="ui form"
            onSubmit={(values) => handleSubmit(values)}
            autoComplete="off"
          >
            <CustomTextInput name="title" placeholder="title" />
            <CustomTextArea
              rows={3}
              placeholder="Description"
              name="description"
            />
            <CustomTextInput placeholder="Price" name="price" />
            <CustomTextInput
              placeholder="DiscountPercentage"
              name="discountPercentage"
            />
            <CustomTextInput placeholder="Rating" name="rating" />
            <CustomTextInput placeholder="Stock" name="stock" />
            <CustomTextInput placeholder="Brand" name="brand" />
            <CustomSelectInput
              options={categoryOptions}
              placeholder="Category"
              name="category"
            />
            <CustomTextInput placeholder="Thumbnail" name="thumbnail" />
            <Button
            disabled={isSubmitting || !dirty || !isValid}
              loading={loading}
              floated="right"
              positive
              type="submit"
              content="Submit"
            />
            <Button
              as={Link}
              to="/products"
              floated="right"
              type="button"
              content="Cancel"
            />
          </Form>
        )}
      </Formik>
    </Segment>
  );
});
