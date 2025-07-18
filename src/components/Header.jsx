import { AppBar, Toolbar, Typography, IconButton, Button } from "@mui/material";
import StorefrontIcon from "@mui/icons-material/Storefront";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const logout = () => {
    navigate("/");
  };

  return (
    <AppBar position="static" color="primary" elevation={2}>
      <Toolbar>
        <IconButton edge="start" color="inherit" sx={{ mr: 1 }}>
          <StorefrontIcon fontSize="large" />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Shopcart
        </Typography>
        <Button
          variant="outlined"
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            zIndex: 1000,
            borderColor: "white",
            color: "white",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              borderColor: "white",
            },
          }}
          onClick={logout}
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}
