import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  CircularProgress,
  Paper,
  IconButton,
  Button,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";


export default function ProductDetails() {
  const { id } = useParams();
  const API_URL = `https://fakestoreapi.com/products/${id}`;
  const [produto, setProduto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { adicionarAoCarrinho } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProduto() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("Produto não encontrado");

        const data = await res.json();
        setProduto(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProduto();
  }, [id]);

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Box sx={{ textAlign: "center", mt: 10 }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );

  return (
    <>
      <Box sx={{ maxWidth: 900, margin: "40px auto 0", px: 2 }}>
        <IconButton
          onClick={() => navigate("/products")}
          sx={{ color: "primary.main" }}
        >
          <ArrowBackIcon fontSize="large" />
        </IconButton>
      </Box>

      <Paper
        sx={{
          maxWidth: 900,
          margin: "20px auto",
          p: 4,
          display: "flex",
          gap: 4,
          flexWrap: "wrap",
        }}
        elevation={3}
      >
        <Box
          component="img"
          src={produto.image}
          alt={produto.title}
          sx={{
            width: { xs: "100%", sm: 300 },
            height: { xs: "auto", sm: 300 },
            objectFit: "contain",
            borderRadius: 2,
            boxShadow: 3,
            margin: { xs: "0 auto", sm: 0 },
            display: "block",
          }}
        />

        <Box sx={{ flex: 1, minWidth: 300 }}>
          <Typography variant="h4" gutterBottom>
            {produto.title}
          </Typography>
          <Typography variant="h5" color="primary" gutterBottom>
            R$ {produto.price.toFixed(2)}
          </Typography>

          <Typography variant="body1" paragraph>
            {produto.description}
          </Typography>

          <Typography variant="subtitle1" sx={{ mt: 4 }}>
            Avaliação:
            <Box
              component="span"
              sx={{ ml: 1, fontWeight: "bold", color: "secondary.main" }}
            >
              {produto.rating?.rate ?? "N/A"} / 5 ({produto.rating?.count ?? 0}{" "}
              avaliações)
            </Box>
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={
              <ShoppingCartIcon fontSize="small" sx={{ opacity: 0.7 }} />
            }
            sx={{ mt: 4 }}
            onClick={() => {
              adicionarAoCarrinho(produto);
              navigate("/products");
            }}
          >
            Adicionar
          </Button>
        </Box>
      </Paper>
    </>
  );
}
