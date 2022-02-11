import React from "react";
import "./styles.css";
import cartImg from "../../../assets/icons/bag-plus.svg";

function Product({ product, onAddToCart }) {
  return (
    <div className="product-grid-container position-relative">
      <img
        src={product.image.url}
        class="img-fluid product-grid-image "
        alt={product.name}
      />
      <button
        aria-label="Add to Cart"
        onClick={() => onAddToCart(product.id, 1)}
        className="add-to-cart-button"
      >
        <img src={cartImg} alt="Add to Cart" />
      </button>

      <div className="product-grid-text p-2 text-center">
        <h5 className="product-grid-title">{product.name}</h5>
        <h6>{product.price.raw} лв.</h6>
      </div>
    </div>
  );
}

export default Product;
