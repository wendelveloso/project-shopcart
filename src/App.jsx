import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Checkout from "./pages/Checkout";
import Thanks from "./pages/Thanks";
import NotFound from "./pages/NotFound";

import Layout from "./layout/Layout";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="*" element={<NotFound />} />

        <Route element={<Layout />}>
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/thanks" element={<Thanks />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
