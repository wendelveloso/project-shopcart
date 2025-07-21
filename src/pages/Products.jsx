import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import FloatingCheckoutButton from "../components/FloatingCheckoutButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const API_URL = "https://fakestoreapi.com/products";

export default function Products() {
  const [produtos, setProdutos] = useState([]);
  const [filtroCategoria, setFiltroCategoria] = useState("Todos");
  const [busca, setBusca] = useState("");

  const { carrinho, adicionarAoCarrinho, total, removerItemInteiro } =
    useCart();

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProdutos() {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error("Erro ao buscar produtos");
        }
        const data = await response.json();
        setProdutos(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchProdutos();
  }, []);

  const produtosFiltrados = produtos
    .filter(
      (p) => filtroCategoria === "Todos" || p.category === filtroCategoria
    )
    .filter((p) => p.title.toLowerCase().includes(busca.toLowerCase()));

  const categorias = ["Todos", ...new Set(produtos.map((p) => p.category))];

  const irParaCheckout = () => {
    navigate("/checkout", { state: { carrinho } });
  };

  const irParaDetalhes = (id) => {
    navigate(`/products/${id}`);
  };

  return (
    <Box
      sx={{
        pt: {
          xs: 4,
          sm: 6,
        },
        px: {
          xs: 1,
          sm: 4,
        },
        pb: {
          xs: 3,
          sm: 4,
        },
        position: "relative",
      }}
    >
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <TextField
          size="small"
          variant="outlined"
          label="Buscar produtos"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          sx={{
            maxWidth: 500,
            minWidth: {
              xs: 200,
              sm: 250,
              md: 300,
              backgroundColor: "#fff",
            },
          }}
        />
      </Box>

      <Stack direction="row" spacing={1} mb={4} flexWrap="wrap" rowGap={1}>
        {categorias.map((cat) => (
          <Button
            key={cat}
            variant={cat === filtroCategoria ? "contained" : "outlined"}
            onClick={() => setFiltroCategoria(cat)}
            sx={{
              minHeight: 40,
              maxWidth: 155,
              minWidth: 60,
              wordBreak: "break-word",
              textOverflow: "ellipsis",
              fontSize: {
                xs: "0.60rem",
                sm: "0.8rem",
                md: "1rem",
              },
            }}
          >
            {cat}
          </Button>
        ))}
      </Stack>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(2, 1fr)",
            sm: "repeat(auto-fill, minmax(240px, 1fr))",
          },
          gap: {
            xs: 1.5,
            sm: 3,
          },
        }}
      >
        {produtosFiltrados.map((produto) => (
          <Card
            key={produto.id}
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <CardMedia
              component="img"
              height="160"
              image={produto.image}
              alt={produto.title}
              onClick={() => irParaDetalhes(produto.id)}
              sx={{ cursor: "pointer" }}
            />
            <CardContent>
              <Tooltip title={produto.title}>
                <Typography
                  variant="h7"
                  title={produto.title}
                  sx={{
                    whiteSpace: {
                      xs: "normal",
                      sm: "nowrap",
                    },
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: {
                      xs: "-webkit-box",
                      sm: "block",
                    },
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: {
                      xs: 2,
                      sm: "unset",
                    },
                    height: {
                      xs: "2.8em",
                      sm: "auto",
                    },
                  }}
                >
                  {produto.title}
                </Typography>
              </Tooltip>
              <Typography variant="subtitle1" color="text.secondary">
                R$ {produto.price.toFixed(2)}
              </Typography>
            </CardContent>

            <Box sx={{ mt: "auto", px: 2, pb: 2 }}>
              <Button
                variant="contained"
                size="small"
                fullWidth
                startIcon={
                  <ShoppingCartIcon fontSize="small" sx={{ opacity: 0.7 }} />
                }
                sx={{ fontSize: "0.75rem", py: 0.5 }}
                onClick={() => adicionarAoCarrinho(produto)}
              >
                Adicionar
              </Button>
            </Box>
          </Card>
        ))}
      </Box>

      <FloatingCheckoutButton
        carrinho={carrinho}
        total={total}
        disabled={total === 0}
        onCheckout={irParaCheckout}
        onRemoveItem={removerItemInteiro}
      />
    </Box>
  );
}
