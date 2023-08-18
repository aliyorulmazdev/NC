import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { Header, List } from "semantic-ui-react";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/products").then((response) => {
      setProducts(response.data);
    });
  }, []);
  return (
    <div>
      <Header as='h2' icon='users' content='prExplorer'/>
        <List>
          {products.map((product: any) => (
            <List.Item key={product.id}>
              {product.title} - {product.price}
              <br></br>
              {product.description}
            </List.Item>
          ))}
        </List>
    </div>
  );
}

export default App;
