import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import { CssBaseline, Box } from "@mui/material";

export default function Layout() {
  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "#F7F9FB",
        }}
      >
        <Header />
        <Outlet />
      </Box>
    </>
  );
}
