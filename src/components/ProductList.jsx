import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "./NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import "../ProductList.css"; // Import the CSS file

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        {/* Search Bar */}
        <div className="d-flex justify-content-center mb-4">
          <input
            type="text"
            className="form-control w-50"
            placeholder="Search for products..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Loading State */}
        {loading ? (
          <div id="loading">
            <div className="spinner-border" role="status"></div>
            <p>Loading products...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          // No products found
          <div className="no-products">No products found</div>
        ) : (
          // Product List
          <div className="row mt-4" id="products-container">
            {filteredProducts.map((product) => (
              <div key={product.id} className="col-md-4">
                <div className="product-card">
                  <img src={product.image} alt={product.title} />
                  <h5>{product.title}</h5>
                  <p>${product.price}</p>
                  <Link to={`/product/${product.id}`} className="btn btn-primary">
                    View
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
