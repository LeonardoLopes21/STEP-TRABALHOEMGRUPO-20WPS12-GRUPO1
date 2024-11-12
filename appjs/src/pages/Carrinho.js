import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Carrinho.module.css';

function Carrinho() {
  const [carrinho, setCarrinho] = useState([]);
  const [valorTotal, setValorTotal] = useState(0);
  const [showConfirmCard, setShowConfirmCard] = useState(false);
  const navigate = useNavigate();

  async function fetchCart() {
    try {
      const response = await fetch("http://localhost:4000/carrinho");
      if (response.ok) {
        const data = await response.json();
        setCarrinho(data);
        calcularValorTotal(data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchCart();
  }, []);

  function calcularValorTotal(carrinho) {
    const total = carrinho.reduce((acc, item) => acc + (item.preco || 0) * (item.qtd || 0), 0);
    setValorTotal(total);
  }

  async function updateItemQuantity(id, quantity) {
    try {
      if (quantity < 1) {
        await fetch(`http://localhost:4000/carrinho/${id}`, {
          method: 'DELETE',
        });
        fetchCart();
      } else {
        const item = carrinho.find(item => item.id === id);
        if (item) {
          await fetch(`http://localhost:4000/carrinho/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...item, qtd: quantity }),
          });
          fetchCart();
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  function incrementQuantity(id, currentQuantity) {
    updateItemQuantity(id, currentQuantity + 1);
  }

  function decrementQuantity(id, currentQuantity) {
    updateItemQuantity(id, currentQuantity - 1);
  }

  function handleBuy() {
    setShowConfirmCard(true);
  }

  async function confirmPurchase() {
    try {
      // Limpa o carrinho no banco de dados
      for (const item of carrinho) {
        await fetch(`http://localhost:4000/carrinho/${item.id}`, {
          method: 'DELETE',
        });
      }
      alert('Compra realizada com sucesso!');
      navigate('/'); // Redireciona para a página inicial
    } catch (error) {
      console.error("Erro ao finalizar a compra:", error);
    }
  }

  return (
    <div className={styles['carrinho-container']}>
      <h2 className={styles['carrinho-title']}>Carrinho</h2>

      {carrinho.length > 0 && (
            <div className={styles['total-container']}>
              <h3>Total: R${valorTotal.toFixed(2)}</h3>
              <button className={styles['buy-button']} onClick={handleBuy}>
                Comprar
              </button>
            </div>
          )}

      {showConfirmCard ? (
        <div className={styles['confirm-card']}>
          <h3>Deseja finalizar a compra?</h3>
          <p>Valor total: R${valorTotal.toFixed(2)}</p>
          <p>Método de pagamento: <strong>Boleto</strong></p>
          <ul className={styles['confirm-list']}>
            {carrinho.map(item => (
              <li key={item.id}>
                {item.nome} - Quantidade: {item.qtd}
              </li>
            ))}
          </ul>
          <div className={styles['confirm-buttons']}>
            <button onClick={confirmPurchase} className={styles['confirm-button']}>Confirmar compra</button>
            <button onClick={() => setShowConfirmCard(false)} className={styles['cancel-button']}>Cancelar</button>
          </div>
        </div>
      ) : (
        <>
          <div className={styles['item-container']}>
            {carrinho.map(item => (
              <div key={item.id} className={styles['item']}>
                <p className={styles['item-name']}>{item.nome}</p>
                <div className={styles['item-info']}>
                  <p className={styles['item-price']}>Preço Unitário: R${item.preco.toFixed(2)}</p>
                  <p className={styles['item-total']}>Valor Total: R${(item.preco * item.qtd).toFixed(2)}</p>
                </div>
                <div className={styles['quantity-buttons']}>
                  <button onClick={() => incrementQuantity(item.id, item.qtd)}>+</button>
                  <span className={styles['item-quantity']}>{item.qtd}</span>
                  <button onClick={() => decrementQuantity(item.id, item.qtd)}>-</button>
                </div>
              </div>
            ))}
          </div>
          
        </>
      )}
    </div>
  );
}

export default Carrinho;
