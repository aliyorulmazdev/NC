import { useEffect, useState } from "react";
import { Container } from "semantic-ui-react";
import { v4 as uuid } from "uuid";
import ProductDashboard from "../../features/products/dashboard/ProductDashboard";
import agent from "../api/agent";
import { Product } from "../models/product";
import LoadingComponent from "./LoadingComponent";
import NavBar from "./NavBar";

function App() {
  // [CR 19-08-2023] These things related to fetching the products should go to components responsible for displaying the products list,
  // so in this case it should be ProductDashboard.tsx
  // The App component should be quite empty, it fact should only contain the NavBar and the ProductDashboard
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(
    undefined
  );
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  // [CR 19-08-2023] As you have quite some state here already, please move it to MobX store/stores

  useEffect(() => {
    agent.Products.list().then((response) => {
      setProducts(response);
      setLoading(false);
    });
  }, []);

  function handleSelectProduct(id: string) {
    setSelectedProduct(products.find((x) => x.id === id));
  }

  function handleCancelSelectedProduct() {
    setSelectedProduct(undefined);
  }

  function handleFormOpen(id?: string) {
    id ? handleSelectProduct(id) : handleCancelSelectedProduct();
    setEditMode(true);
  }

  function handleFormClose() {
    setEditMode(false);
  }

  function handleCreateOrEditProduct(product: Product) {
    setSubmitting(true);
    if (product.id) {
      agent.Products.update(product).then(() => {
        setProducts([...products.filter((x) => x.id !== product.id), product]);
        setSelectedProduct(product);
        setEditMode(false);
        setSubmitting(false);
      });
    } else {
      product.id = uuid(); // [CR 19-08-2023] It would be better to let the server generate the id
      // This way, IDs management stays on the server. That way, you could have a single action in your API for "Saving" the product.
      // Based on whether the ID is present or not, the server would know whether to create or update the product.
      agent.Products.create(product).then(() => {
        setProducts([...products, product]);
        setSelectedProduct(product);
        setEditMode(false);
        setSubmitting(false);
      });
    }
  }

  function handleDeteleProduct(id: string) {
    setSubmitting(true);
    agent.Products.delete(id).then(() => {
      setProducts([...products.filter((x) => x.id !== id)]);
      setSubmitting(false);
    });
  }

  // [CR 19-08-2023] That's again a very good practice to use a LoadingComponent!
  if (loading) return <LoadingComponent content="Loading App" />;

  return (
    <>
      <NavBar openForm={handleFormOpen} />
      <Container style={{ marginTop: "7em" }}>
        <ProductDashboard
          products={products}
          selectedProduct={selectedProduct}
          selectProduct={handleSelectProduct}
          cancelSelectedProduct={handleCancelSelectedProduct}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit={handleCreateOrEditProduct}
          deleteProduct={handleDeteleProduct}
          submitting={submitting}
        />
      </Container>
    </>
  );
}

export default App;
