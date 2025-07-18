import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Paper,
  Stack,
  Tooltip,
  Divider,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useCart } from "../contexts/CartContext";

export default function Thanks() {
  const navigate = useNavigate();
  const { carrinho, total, limparCarrinho } = useCart();

  const voltarParaProdutos = () => {
    limparCarrinho();
    navigate("/products");
  };

  return (
    <Box
      sx={{
        maxWidth: 700,
        margin: "40px auto 0",
        p: 3,
        textAlign: "center",
      }}
    >
      <CheckCircleOutlineIcon color="success" sx={{ fontSize: 80, mb: 2 }} />
      <Typography variant="h4" gutterBottom>
        Obrigado pela sua compra!
      </Typography>

      <Typography variant="subtitle1" gutterBottom color="text.secondary">
        Aqui está o resumo do seu pedido:
      </Typography>

      {Object.values(carrinho).length === 0 ? (
        <Typography color="text.secondary" mb={3}>
          Nenhum item encontrado.
        </Typography>
      ) : (
        <Paper sx={{ p: 2, mb: 3, textAlign: "left" }}>
          {Object.values(carrinho).map(
            ({ produto, quantity }, index, array) => (
              <Box
                key={produto.id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  py: 1,
                  flexWrap: "wrap",
                }}
              >
                <Tooltip title={produto.title} arrow>
                  <Typography
                    sx={{
                      flex: "1 1 100%",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      cursor: "default",
                      fontWeight: "600",
                      minWidth: 0,
                    }}
                  >
                    {produto.title}
                  </Typography>
                </Tooltip>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ minWidth: 120 }}
                >
                  <Box
                    component="span"
                    sx={{
                      flex: 1,
                      textAlign: "right",
                      fontWeight: "bold",
                    }}
                  >
                    {quantity}
                  </Box>{" "}
                  &times;{" "}
                  <Box component="span">R$ {produto.price.toFixed(2)}</Box>
                </Typography>

                <Typography
                  sx={{ flex: 1, textAlign: "right", fontWeight: "bold" }}
                >
                  R$ {(produto.price * quantity).toFixed(2)}
                </Typography>

                {index !== array.length - 1 && (
                  <Divider sx={{ width: "100%", my: 1 }} />
                )}
              </Box>
            )
          )}

          <Divider sx={{ my: 2 }} />

          <Typography
            variant="h6"
            sx={{ textAlign: "right", fontWeight: "bold", fontSize: "1.2rem" }}
          >
            Total: R${" "}
            {total.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
          </Typography>
        </Paper>
      )}

      <Button
        variant="contained"
        color="primary"
        onClick={voltarParaProdutos}
        sx={{ mt: 1 }}
      >
        Voltar para Produtos
      </Button>
    </Box>
  );
}
