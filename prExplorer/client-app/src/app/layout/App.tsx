import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container } from "semantic-ui-react";
import { Product } from "../models/product";
import NavBar from "./NavBar";
import ProductDashboard from "../../features/products/dashboard/ProductDashboard";
import {v4 as uuid} from 'uuid';

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios
      .get<Product[]>("http://localhost:5000/api/products")
      .then((response) => {
        setProducts(response.data);
      });
  }, []);

function handleSelectProduct(id: string) {
  setSelectedProduct(products.find(x => x.id === id));
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
  product.id
  ? setProducts([...products.filter(x => x.id !== product.id), product])
  : setProducts([...products, {...product, id: uuid()}]);

  setEditMode(false);
  setSelectedProduct(product);
}

function handleDeteleProduct(id: string) {
  setProducts([...products.filter(x => x.id !== id)])
}


  return (
    <>
      <NavBar openForm= {handleFormOpen}/>
      <Container style={{ marginTop: "7em" }}>
        <ProductDashboard
        products={products}
        selectedProduct= {selectedProduct}
        selectProduct={handleSelectProduct}
        cancelSelectedProduct = {handleCancelSelectedProduct}
        editMode={editMode}
        openForm={handleFormOpen}
        closeForm={handleFormClose}
        createOrEdit={handleCreateOrEditProduct}
        deleteProduct={handleDeteleProduct}
        />
      </Container>
    </>
  );
}

export default App;
