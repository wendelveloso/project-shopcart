import { useEffect, useRef } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Box,
} from "@mui/material";
import StorefrontIcon from "@mui/icons-material/Storefront";
import LogoutIcon from "@mui/icons-material/Logout";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { useNavigate } from "react-router-dom";
import { animate, createScope, createSpring } from "animejs";

export default function Header() {
  const navigate = useNavigate();
  const root = useRef(null);
  const scope = useRef(null);

  const logout = () => navigate("/");
  const checkout = () => navigate("/checkout");

  useEffect(() => {
    scope.current = createScope({ root }).add(() => {
      animate(".logo", {
        scale: [
          { to: 1.25, ease: "inOut(3)", duration: 200 },
          { to: 1, ease: createSpring({ stiffness: 300 }) },
        ],
        loop: true,
        loopDelay: 250,
      });
    });

    return () => scope.current?.revert();
  }, []);

  return (
    <AppBar position="static" color="primary" elevation={2} ref={root}>
      <Toolbar>
        <IconButton edge="start" color="inherit" sx={{ mr: 1 }}>
          <StorefrontIcon fontSize="large" className="logo" />
        </IconButton>

        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Shopcart
        </Typography>

        <Button
          variant="outlined"
          startIcon={<ShoppingBagIcon />}
          onClick={checkout}
          sx={{
            position: "absolute",
            top: 16,
            right: {
              xs: 56,
              sm: 140,
            },
            zIndex: 5,
            color: "white",
            borderColor: {
              xs: "transparent",
              sm: "white",
            },
            minWidth: "auto",
            px: {
              xs: 0.5,
              sm: 2,
            },
            "&:hover": {
              backgroundColor: {
                xs: "transparent",
                sm: "rgba(255, 255, 255, 0.1)",
              },
              borderColor: {
                xs: "transparent",
                sm: "white",
              },
            },
            "& .MuiButton-startIcon": {
              mr: {
                xs: 0,
                sm: 1,
              },
            },
          }}
        >
          <Box
            component="span"
            sx={{
              display: {
                xs: "none",
                sm: "inline",
              },
            }}
          >
            Checkout
          </Box>
        </Button>

        <Button
          variant="outlined"
          startIcon={<LogoutIcon />}
          onClick={logout}
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            zIndex: 5,
            color: "white",
            borderColor: {
              xs: "transparent",
              sm: "white",
            },
            minWidth: "auto",
            px: {
              xs: 0.5,
              sm: 2,
            },
            "&:hover": {
              backgroundColor: {
                xs: "transparent",
                sm: "rgba(255, 255, 255, 0.1)",
              },
              borderColor: {
                xs: "transparent",
                sm: "white",
              },
            },
            "& .MuiButton-startIcon": {
              mr: {
                xs: 0,
                sm: 1,
              },
            },
          }}
        >
          <Box
            component="span"
            sx={{
              display: {
                xs: "none",
                sm: "inline",
              },
            }}
          >
            Logout
          </Box>
        </Button>
      </Toolbar>
    </AppBar>
  );
}
