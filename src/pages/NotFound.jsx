import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        px: 2,
      }}
    >
      <Typography variant="h1" color="primary" gutterBottom>
        404
      </Typography>
      <Typography variant="h5" gutterBottom>
        Ops! Página não encontrada.
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={3}>
        A página que você está procurando não existe ou foi removida.
      </Typography>
      <Button variant="contained" onClick={() => navigate("/products")}>
        Voltar para Produtos
      </Button>
    </Box>
  );
}
