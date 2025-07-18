import { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  Paper,
  Avatar,
  IconButton,
  InputAdornment,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import validator from "email-validator";
import imgShopCart from "../assets/img-shopcart.png";

import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isEmailValid = validator.validate(email);
    const isSenhaValid = senha.length >= 8;
    setIsValid(isEmailValid && isSenhaValid);
  }, [email, senha]);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/products");
  };

  return (
    <Grid container component="main" sx={{ height: "100vh", display: "flex" }}>
      <Paper
        elevation={20}
        square
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          backgroundColor: "#F7F9FB",
          px: { xs: 2, sm: 6 },
          minWidth: 300,
          maxWidth: 500,
          zIndex: 2,
        }}
      >
        <Grid
          container
          direction="column"
          alignItems="center"
          sx={{ width: "100%", maxWidth: 400 }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Entrar na sua conta
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Endereço de e-mail"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Senha"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword((prev) => !prev)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={!isValid}
            >
              Entrar
            </Button>
          </Box>
        </Grid>
      </Paper>

      <Grid
        sx={{
          position: "relative",
          flex: 1.5,
          backgroundImage: `url(${imgShopCart})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: { xs: "none", sm: "block" },
          filter: "brightness(0.7)",
          minWidth: 0,
          overflowX: "hidden",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(0%, -50%)",
          color: "white",
          textAlign: "center",
          zIndex: 2,
          px: 3,
          maxWidth: 400,
          userSelect: "none",
          display: { xs: "none", sm: "block" },
        }}
      >
        <Typography variant="h1" component="h2" fontWeight="bold" gutterBottom>
          ShopCart
        </Typography>
        <Typography variant="h6" fontStyle="italic">
          Moda, inovação e estilo – do seu jeito.
        </Typography>
      </Box>
    </Grid>
  );
}
