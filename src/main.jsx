import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CartProvider } from "./contexts/CartContext";
import { CssBaseline } from "@mui/material";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CartProvider>
      <CssBaseline />
      <App />
    </CartProvider>
  </React.StrictMode>
);
