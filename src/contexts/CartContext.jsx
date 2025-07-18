import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [carrinho, setCarrinho] = useState({});

  const adicionarAoCarrinho = (produto) => {
    setCarrinho((prev) => {
      const quantidadeAtual = prev[produto.id]?.quantity || 0;
      return {
        ...prev,
        [produto.id]: {
          produto,
          quantity: quantidadeAtual + 1,
        },
      };
    });
  };

  const removerDoCarrinho = (produto) => {
    setCarrinho((prev) => {
      const quantidadeAtual = prev[produto.id]?.quantity || 0;
      if (quantidadeAtual <= 1) {
        const novoCarrinho = { ...prev };
        delete novoCarrinho[produto.id];
        return novoCarrinho;
      } else {
        return {
          ...prev,
          [produto.id]: {
            produto,
            quantity: quantidadeAtual - 1,
          },
        };
      }
    });
  };

  const removerItemInteiro = (produtoId) => {
    setCarrinho((prev) => {
      const novoCarrinho = { ...prev };
      delete novoCarrinho[produtoId];
      return novoCarrinho;
    });
  };
  const limparCarrinho = () => {
    setCarrinho({});
  };

  const total = Object.values(carrinho).reduce(
    (acc, item) => acc + item.produto.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        carrinho,
        adicionarAoCarrinho,
        removerDoCarrinho,
        removerItemInteiro,
        total,
        limparCarrinho,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
