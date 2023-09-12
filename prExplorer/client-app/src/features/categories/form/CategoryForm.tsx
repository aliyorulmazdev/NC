import React, { useEffect, useState } from "react";
import { Button, Header, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link, useNavigate, useParams } from "react-router-dom";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { v4 as uuid } from "uuid";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import CustomTextInput from "../../../app/common/form/CustomTextInput";
import CustomTextArea from "../../../app/common/form/CustomTextArea";

import { Category } from "../../../app/models/category";

export default observer(function CategoryForm() {
  const { categoryStore } = useStore();
  const {
    createCategory,
    updateCategory,
    loading,
    loadCategory,
    loadingInitial,
  } = categoryStore;
  const { id } = useParams();
  const navigate = useNavigate();

  const [Category, setCategory] = useState<Category>({
    id: "",
    title: "",
    description: "",
    thumbnail: "",
    appUserId: "",
  });

  const validationScheme = Yup.object({
    title: Yup.string().required("The title field is required for Category"),
    description: Yup.string().required(
      "The description is required for Category"
    ),
    thumbnail: Yup.string().required(
      "The thumbnail is required for Category"
    ),
  });

  useEffect(() => {
    if (id) loadCategory(id).then((Category) => setCategory(Category!));
  }, [id, loadCategory]);

  function handleFormSubmit(Category: Category) {
    if (!Category.id) {
      Category.id = uuid();
      createCategory(Category).then(() =>
        navigate(`/Categories/${Category.id}`)
      );
    } else {
      updateCategory(Category).then(() =>
        navigate(`/Categories/${Category.id}`)
      );
    }
  }

  if (loadingInitial) return <LoadingComponent content="Loading Category..." />;

  return (
    <Segment clearing>
      <Header content="Category Details" sub color="orange" />
      <Formik
        validationSchema={validationScheme}
        initialValues={Category}
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
              to="/Categorys"
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
