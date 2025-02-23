import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/${id}`)
      .then((response) => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="text-center mt-4">Loading product details...</p>;
  if (!product) return <p className="text-center mt-4">Product not found!</p>;

  return (
    <div className="container mt-4">
      <Link to="/" className="btn btn-secondary mb-3">Back to Products</Link>
      <div className="card">
        <div className="row">
          <div className="col-md-4">
            <img src={product.image} className="card-img-top p-3" alt={product.title} />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{product.title}</h5>
              <p className="card-text"><strong>Price:</strong> ${product.price}</p>
              <p className="card-text"><strong>Description:</strong> {product.description}</p>
              <p className="card-text"><strong>Category:</strong> {product.category}</p>
              <p className="card-text"><strong>Rating:</strong> {product.rating?.rate} ⭐ ({product.rating?.count} reviews)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
