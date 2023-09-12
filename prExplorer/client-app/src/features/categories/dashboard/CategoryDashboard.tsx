import React, { useEffect } from "react";
import { Grid, GridColumn } from "semantic-ui-react";
import CategoryList from "./CategoryList";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import LoadingComponent from "../../../app/layout/LoadingComponent";


export default observer(function CategoryDashboard() {

  const {categoryStore} = useStore();
  const {loadCategories, categoryRegistry} = categoryStore;

  useEffect(() => {
    if (categoryRegistry.size <= 1) categoryStore.loadCategories();
  }, [loadCategories, categoryRegistry, categoryStore]);

  if (categoryStore.loadingInitial) return <LoadingComponent content="Loading Categories" />;

  return (
    <Grid>
      <GridColumn width="15">
        <CategoryList />
      </GridColumn>
    </Grid>
  );
})