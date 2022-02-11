import React, { useState, useEffect } from "react";
import { commerce } from "./lib/commerce";
import { Products, Navbar, Cart, Checkout } from "./Components/";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./main.css";

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  };

  const fetchCart = () => {
    commerce.cart.retrieve().then((cart) => setCart(cart));
  };

  const handleAddToCart = async (productId) => {
    const itemExistsInCart = cart.line_items.some(
      (el) => el.product_id === productId
    );
    if (itemExistsInCart) {
      alert("Този артикул вече е в количката.");
    } else {
      const { cart } = await commerce.cart.add(productId);
      setCart(cart);
    }
  };

  const handleRemoveFromCart = async (productId) => {
    const { cart } = await commerce.cart.remove(productId);
    setCart(cart);
  };

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();
    setCart(newCart);
  };
  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(
        checkoutTokenId,
        newOrder
      );
      setOrder(incomingOrder);
      console.log(incomingOrder);
      refreshCart();
    } catch (err) {
      setErrorMessage(err.data.error.message);
    }
  };

  console.log("cart: ", cart.line_items);

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);
  return (
    <Router>
      <div>
        <Navbar totalItems={cart.total_unique_items} />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <Products products={products} onAddToCart={handleAddToCart} />
            }
          />
          <Route
            exact
            path="/cart"
            element={
              <Cart cart={cart} handleRemoveFromCart={handleRemoveFromCart} />
            }
          />
          <Route
            exact
            path="/checkout"
            element={
              <Checkout
                cart={cart}
                order={order}
                handleCaptureCheckout={handleCaptureCheckout}
                error={errorMessage}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
