import { React, useEffect, useState } from 'react';
import styles from './Produtos.module.css'

function Produtos() {
  const [carrinho, setCarrinho] = useState([]);
  const [gamesDb, setGamesDB] = useState([]);

  async function fetchGames() {
    try {
      const response = await fetch("http://localhost:3000/games");
      if (response.ok) {
        const data = await response.json();
        setGamesDB(data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  function handleGameData(id) {
    return gamesDb.find(game => game.id === id);
  }

  async function fetchCart() {
    try {
      const response = await fetch("http://localhost:3000/carrinho");
      if (response.ok) {
        const data = await response.json();
        setCarrinho(data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchGames();
    fetchCart();
    const interval = setInterval(() => {
      fetchCart();
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  async function addAnotherOne(id, data) {
    try {
      const response = await fetch(`http://localhost:3000/carrinho/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      fetchCart();
    } catch (error) {
      console.error(error);
    }
  }

  async function addFirst(id) {
    const gamedata = handleGameData(id);
    try {
      await fetch('http://localhost:3000/carrinho', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(gamedata),
      });
      fetchCart();
    } catch (error) {
      console.error(error);
    }
  }

  async function insertIntoCart(id) {
    const existingItem = carrinho.find(item => item.id === id);
    if (existingItem) {
      existingItem.qtd = Number(existingItem.qtd) + 1;
      await addAnotherOne(id, existingItem);
    } else {
      addFirst(id);
    }
  }

  return (
    <div className="page">
      <h1>Nossos Produtos</h1>
      
      <div className={styles['card-container']}>
        <div className={styles.card}>
          <h2>Bloodborne</h2>
          <p><strong>Categoria:</strong> Soulslike</p>
          <p><strong>Preço:</strong> R$250</p>
          <p><strong>Plataforma:</strong> PS4</p>
          <button className={styles.button} onClick={() => insertIntoCart("50e9")}>Adicionar ao Carrinho</button>
        </div>

        <div className={styles.card}>
          <h2>The Witcher 3</h2>
          <p><strong>Categoria:</strong> RPG</p>
          <p><strong>Preço:</strong> R$300</p>
          <p><strong>Plataforma:</strong> PC</p>
          <button className={styles.button} onClick={() => insertIntoCart("60a9")}>Adicionar ao Carrinho</button>
        </div>

        <div className={styles.card}>
          <h2>Spider-Man</h2>
          <p><strong>Categoria:</strong> Ação</p>
          <p><strong>Preço:</strong> R$350</p>
          <p><strong>Plataforma:</strong> PS4</p>
          <button className={styles.button} onClick={() => insertIntoCart("70b9")}>Adicionar ao Carrinho</button>
        </div>

        
      </div>
    </div>
  );
}

export default Produtos;
