import React, { useEffect, useState } from 'react';
import './App.css';

const products = [
  { id: 1, name: 'Smartphone', price: 1999.99 },
  { id: 2, name: 'Laptop', price: 3999.99 },
  { id: 3, name: 'Fone de Ouvido', price: 299.99 },
  { id: 4, name: 'Monitor', price: 899.99 },
  { id: 5, name: 'Teclado Mecânico', price: 499.99 },
];

function Product({ product, addToCart }) {
  return (
    <div className="product">
      <h3>{product.name}</h3>
      <p>R$ {product.price.toFixed(2)}</p>
      <button onClick={() => addToCart(product)}>Adicionar ao Carrinho</button>
    </div>
  );
}

function CartPage({ cartItems, clearCart }) {
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="cart-page">
      <h2>Itens no Carrinho</h2>
      {cartItems.length === 0 ? (
        <p>Seu carrinho está vazio</p>
      ) : (
        <ul>npm 
          {cartItems.map((item, index) => (
            <li key={index}>
              {item.name} - R$ {item.price.toFixed(2)}
            </li>
          ))}
        </ul>
      )}
      <h3>Total: R$ {total.toFixed(2)}</h3>
      {cartItems.length > 0 && (
        <button onClick={clearCart} className="clear-cart">
          Limpar Carrinho
        </button>
      )}
    </div>
  );
}

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [search, setSearch] = useState('');
  const [showCartPage, setShowCartPage] = useState(false);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(savedCart);
  }, []);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((prevItems) => [...prevItems, product]);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app">
      {showCartPage ? (
        <CartPage cartItems={cartItems} clearCart={clearCart} />
      ) : (
        <>
          <header className="header-bar">
            <div className="search-bar" style={{ flex: 1, marginRight: '16px' }}>
              <input
                type="text"
                placeholder="Buscar produtos..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ width: '100%' }}
              />
              <button className="search-button">
                <span role="img" aria-label="search">
                  🔍
                </span>
              </button>
            </div>
            <div className="cart-icon" onClick={() => setShowCartPage(true)}>
              <span role="img" aria-label="cart">
                🛒
              </span>
              {cartItems.length > 0 && (
                <span className="cart-notification">{cartItems.length}</span>
              )}
            </div>
          </header>
          <main>
            <h1 className="main-title" style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              textAlign: 'center',
              color: '#2c3e50',
              margin: '20px 0',
              textShadow: '1px 1px 4px rgba(0, 0, 0, 0.2)'
            }}>
              E-commerce de Eletrônicos
            </h1>
            <div className="products">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <Product key={product.id} product={product} addToCart={addToCart} />
                ))
              ) : (
                <p>Nenhum produto encontrado.</p>
              )}
            </div>
          </main>
        </>
      )}
    </div>
  );
}

export default App;
