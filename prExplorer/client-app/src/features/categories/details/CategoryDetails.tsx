import React, { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import CategoryDetailedHeader from "./CategoryDetailedHeader";
import CategoryDetailedInfo from "./CategoryDetailedInfo";
import CategoryDetailedChat from "./CategoryDetailedChat";
import CategoryDetailedSidebar from "./CategoryDetailedSidebar";

export default observer(function CategoryDetails() {
  const { categoryStore } = useStore();
  const {
    selectedCategory: category,
    loadCategory,
    loadingInitial,
  } = categoryStore;
  const { id } = useParams();

  useEffect(() => {
    if (id) loadCategory(id);
  }, [id, loadCategory]);

  if (loadingInitial || !category) return <LoadingComponent />;

  return (
    <Grid>
      <Grid.Column width={10}>
        <CategoryDetailedHeader category={category} />
        <CategoryDetailedInfo category={category} />
        <CategoryDetailedChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <CategoryDetailedSidebar />
      </Grid.Column>
    </Grid>
  );
});
