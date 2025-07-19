import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  IconButton,
  Button,
  Paper,
  Stack,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCart } from "../contexts/CartContext";
import { useTheme } from "@mui/material/styles";

import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";

export default function Checkout() {
  const theme = useTheme();
  const navigate = useNavigate();
  const {
    carrinho,
    removerDoCarrinho,
    removerItemInteiro,
    total,
    adicionarAoCarrinho,
  } = useCart();

  const removerItem = (id) => {
    removerItemInteiro(id);
  };

  const diminuirQuantidade = (id) => {
    removerDoCarrinho(id);
  };

  const finalizarCompra = () => {
    navigate("/thanks");
  };

  const voltarParaProdutos = () => navigate("/products");

  if (Object.keys(carrinho).length === 0)
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <Typography variant="h5" mb={2}>
          Seu carrinho está vazio.
        </Typography>
        <Button variant="contained" onClick={voltarParaProdutos}>
          Voltar para Produtos
        </Button>
      </Box>
    );

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
        maxWidth: 900,
        margin: "auto",
      }}
    >
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        justifyContent="center"
        mb={4}
      >
        <ShoppingCartCheckoutIcon fontSize="large" color="primary" />
        <Typography
          variant="h3"
          sx={{ fontWeight: "bold", textAlign: "center", letterSpacing: 1 }}
        >
          Checkout
        </Typography>
      </Stack>

      <Box
        sx={(theme) => ({
          display: "grid",
          gap: 2,
          gridTemplateColumns: "1fr",
          [theme.breakpoints.down("sm")]: {
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 1,
          },
        })}
      >
        {Object.values(carrinho).map(({ produto, quantity }) => (
          <Paper
            key={produto.id}
            elevation={2}
            sx={(theme) => ({
              p: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 2,
              minHeight: 100,

              [theme.breakpoints.down("sm")]: {
                flexDirection: "column",
                alignItems: "flex-start",
                minHeight: "auto",
                maxWidth: "100%",
              },
            })}
          >
            <Box
              sx={{
                width: 80,
                height: 80,
                overflow: "hidden",
                borderRadius: 1,
                [theme.breakpoints.down("sm")]: {
                  mx: "auto",
                },
              }}
            >
              <img
                src={produto.image}
                alt={produto.title}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </Box>

            <Box
              sx={{
                flex: 1,
                minWidth: 0,
                display: "flex",
                flexDirection: "column",
                gap: 0.5,
                overflowWrap: "break-word",
                wordBreak: "break-word",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  overflowWrap: "break-word",
                  wordBreak: "break-word",
                  fontSize: {
                    xs: "0.75rem",
                    sm: "0.9rem",
                    md: "1rem",
                  },
                }}
              >
                {produto.title}
              </Typography>

              <Stack
                direction={{
                  xs: "column",
                  sm: "row",
                }}
                spacing={0.5}
                alignItems="flex-start"
              >
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    fontSize: {
                      xs: "0.7rem",
                      sm: "0.85rem",
                    },
                  }}
                >
                  Valor unitário:
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 600,
                    fontSize: {
                      xs: "0.9rem",
                      sm: "0.8rem",
                    },
                  }}
                >
                  R$ {produto.price.toFixed(2)}
                </Typography>
              </Stack>

              <Stack direction="row" alignItems="center" mt={1} gap={0.5}>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => diminuirQuantidade(produto)}
                  sx={{
                    minWidth: 60,
                    px: 1.5,
                    [theme.breakpoints.down("sm")]: {
                      minWidth: 50,
                      px: 1,
                      fontSize: "0.7rem",
                    },
                  }}
                >
                  -
                </Button>

                <Typography
                  sx={{
                    minWidth: 28,
                    px: 1,
                    py: 0.5,
                    textAlign: "center",
                    fontSize: {
                      xs: "0.75rem",
                      sm: "0.875rem",
                    },
                    fontWeight: 800,
                    borderRadius: 1,
                    backgroundColor: "#f0f0f0",
                    color: "#333",
                  }}
                >
                  {quantity}
                </Typography>

                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => adicionarAoCarrinho(produto)}
                  sx={{
                    minWidth: 60,
                    px: 1.5,
                    [theme.breakpoints.down("sm")]: {
                      minWidth: 50,
                      px: 1,
                      fontSize: "0.7rem",
                    },
                  }}
                >
                  +
                </Button>
              </Stack>
            </Box>

            <Box
              sx={{
                textAlign: "right",
                minWidth: 120,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                [theme.breakpoints.down("sm")]: {
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mt: 2,
                },
              }}
            >
              <Stack
                direction={{ xs: "row", sm: "column" }}
                justifyContent={{ xs: "space-between", sm: "flex-end" }}
                alignItems={{ xs: "center", sm: "flex-end" }}
                sx={{ width: "100%", mt: 1 }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: 600,
                    whiteSpace: "nowrap",
                    fontSize: {
                      xs: "0.75rem",
                      sm: "1rem",
                    },
                  }}
                >
                  Total: R$ {(produto.price * quantity).toFixed(2)}
                </Typography>

                <IconButton
                  color="error"
                  onClick={() => removerDoCarrinho(produto)}
                >
                  <DeleteIcon />
                </IconButton>
              </Stack>
            </Box>
          </Paper>
        ))}
      </Box>

      <Box
        sx={{
          mt: 4,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ mt: "auto", display: "flex", justifyContent: "flex-end" }}>
          <Button variant="contained" onClick={voltarParaProdutos}>
            Voltar
          </Button>
        </Box>

        <Box sx={{ textAlign: "right" }}>
          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{
              color: "primary.main",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "flex-end",
              gap: 0.3,
              mb: 1,
              fontVariantNumeric: "tabular-nums",
              letterSpacing: 1,
            }}
          >
            <Box component="span" sx={{ fontSize: "1rem", lineHeight: 1 }}>
              R$
            </Box>
            <Box
              sx={{
                lineHeight: 1,
                px: 1,
                borderRadius: 1,
                backgroundColor: "#e0e0e0",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                fontWeight: "bold",
              }}
            >
              {total.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Box>
          </Typography>

          <Button variant="contained" onClick={finalizarCompra}>
            Finalizar Compra
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
