import { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Tooltip,
  Badge,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function FloatingCheckoutButton({
  carrinho,
  total,
  onCheckout,
  disabled,
  onRemoveItem,
}) {
  const [minimized, setMinimized] = useState(false);
  const hasItems = Object.keys(carrinho).length > 0;
  const quantidadeTotal = Object.values(carrinho).reduce(
    (acc, { quantity }) => acc + quantity,
    0
  );
  return (
    <Box
      sx={{
        gap: 1,
        position: "fixed",
        bottom: 16,
        right: 16,
        boxShadow: minimized ? "none" : 3,
        borderRadius: 2,
        bgcolor: minimized ? "none" : "background.paper",
        p: minimized ? 1 : 2,
        width: minimized ? 56 : hasItems ? 320 : 255,
        height: minimized ? 56 : hasItems ? 380 : 160,
        overflow: minimized ? "visible" : "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: minimized ? "center" : "stretch",
        cursor: "default",
        transition: "all 0.3s ease",
        zIndex: 5,
      }}
    >
      <Badge
        color="primary"
        badgeContent={minimized && quantidadeTotal > 0 ? quantidadeTotal : 0}
        invisible={!minimized || quantidadeTotal === 0}
        overlap="circular"
        sx={{ zIndex: 20 }}
      >
        <IconButton
          onClick={() => setMinimized((prev) => !prev)}
          size="small"
          sx={{
            bgcolor: "rgba(0,0,0,0.1)",
            "&:hover": { bgcolor: "rgba(0,0,0,0.2)" },
            width: minimized ? 56 : 28,
            height: minimized ? 56 : 28,
          }}
          aria-label={minimized ? "Maximizar" : "Minimizar"}
        >
          {minimized ? (
            <ExpandLessIcon sx={{ fontSize: 32 }} />
          ) : (
            <ExpandMoreIcon sx={{ fontSize: 24 }} />
          )}
        </IconButton>
      </Badge>

      {!minimized && (
        <>
          <Box
            sx={{
              display: hasItems ? "flex" : "none",
              flexDirection: "column",
              gap: 1,
              mb: 1,
              flexGrow: 1,
              overflowY: "auto",
            }}
          >
            {Object.values(carrinho).map(({ produto, quantity }) => (
              <Tooltip
                key={produto.id}
                title={produto.title || produto.name}
                arrow
              >
                <Box
                  sx={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    bgcolor: "#fafafa",
                    p: 0.5,
                    borderRadius: 1,
                    boxShadow: 1,
                  }}
                >
                  <IconButton
                    size="small"
                    aria-label="remover"
                    onClick={() => onRemoveItem(produto.id)}
                    sx={{
                      position: "absolute",
                      top: 2,
                      right: 2,
                      bgcolor: "rgba(255,255,255,0.8)",
                      zIndex: 10,
                      "&:hover": {
                        bgcolor: "rgba(255, 0, 0, 0.8)",
                        color: "white",
                      },
                    }}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>

                  <Badge
                    badgeContent={quantity}
                    color="primary"
                    overlap="circular"
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                  >
                    <Box
                      component="img"
                      src={produto.image}
                      alt={produto.title || produto.name}
                      sx={{
                        width: 50,
                        height: 50,
                        borderRadius: "50%",
                        objectFit: "cover",
                        border: "1px solid #ccc",
                      }}
                    />
                  </Badge>

                  <Box sx={{ flexGrow: 1 }}>
                    <Typography
                      noWrap
                      variant="body2"
                      fontWeight="bold"
                      sx={{ maxWidth: 160 }}
                    >
                      {produto.title || produto.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      R${" "}
                      {produto.price.toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </Typography>
                  </Box>
                </Box>
              </Tooltip>
            ))}
          </Box>

          <Box
            sx={{
              gap: 1,
              p: 1,
              borderRadius: 2,
              background: "linear-gradient(135deg, #e3f2fd, #bbdefb)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              boxShadow: 2,
            }}
          >
            <Typography variant="body1" fontWeight="bold">
              Total a pagar:
            </Typography>

            <Typography
              variant="h5"
              fontWeight="bold"
              color="primary.main"
              sx={{
                letterSpacing: 1,
                fontVariantNumeric: "tabular-nums",
                textShadow: "0 0 2px rgba(0,0,0,0.1)",
              }}
            >
              R${" "}
              {total.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Typography>
          </Box>

          <Button
            variant="contained"
            fullWidth
            disabled={disabled}
            onClick={onCheckout}
          >
            Checkout
          </Button>
        </>
      )}
    </Box>
  );
}
