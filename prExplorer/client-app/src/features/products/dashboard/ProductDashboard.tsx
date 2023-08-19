// [CR 19-08-2023] You don't need to import React in each component file. In the newest React it's not necessary
import { Grid, GridColumn } from "semantic-ui-react";
import { Product } from "../../../app/models/product";
import ProductDetails from "../details/ProductDetails";
import ProductForm from "../form/ProductForm";
import ProductList from "./ProductList";

// [CR 19-08-2023] That's a very good practice that you added a "features" folder :)

// [CR 19-08-2023] It would be nice if you call the props ProductDashboardProps, so it's obvious they relate to this component
// [CR 19-08-2023] Also, this component takes quite many props. Think how you can limit that number
interface Props {
  products: Product[];
  selectedProduct: Product | undefined;
  selectProduct: (id: string) => void;
  cancelSelectedProduct: () => void;
  editMode: boolean;
  openForm: (id: string) => void;
  closeForm: () => void;
  createOrEdit: (product: Product) => void;
  deleteProduct: (id: string) => void;
  submitting: boolean;
}

export default function ProductDashboard({
  products,
  selectProduct,
  selectedProduct,
  cancelSelectedProduct,
  editMode,
  openForm,
  closeForm,
  createOrEdit,
  deleteProduct,
  submitting,
}: Props) {
  return (
    <Grid>
      <GridColumn width="10">
        <ProductList
          products={products}
          selectProduct={selectProduct}
          deleteProduct={deleteProduct}
          submitting={submitting}
        />
      </GridColumn>
      <GridColumn width="6">
        {selectedProduct && !editMode && (
          <ProductDetails
            product={selectedProduct}
            cancelSelectedProduct={cancelSelectedProduct}
            openForm={openForm}
          />
        )}
        {editMode && (
          <ProductForm
            closeForm={closeForm}
            product={selectedProduct}
            createOrEdit={createOrEdit}
            submitting={submitting}
          />
        )}
      </GridColumn>
    </Grid>
  );
}
