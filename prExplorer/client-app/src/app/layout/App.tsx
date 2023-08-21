import { useEffect, useState } from "react";
import { Container } from "semantic-ui-react";
import { v4 as uuid } from "uuid";
import ProductDashboard from "../../features/products/dashboard/ProductDashboard";
import agent from "../api/agent";
import { Product } from "../models/product";
import LoadingComponent from "./LoadingComponent";
import NavBar from "./NavBar";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(
    undefined
  );
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

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

  const x = 5;
  const y = 6;
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
      product.id = uuid();
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
