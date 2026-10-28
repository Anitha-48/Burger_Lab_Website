import { useEffect, useState } from 'react';
import { menuBurgers, formatBurgerPrice } from '../data/menuBurgers.js';

export default function Navbar({ cart, cartCount }) {
  const [notice, setNotice] = useState('');
  const [cartOpen, setCartOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const cartItems = menuBurgers
    .filter((burger) => cart[burger.id])
    .map((burger) => ({ ...burger, quantity: cart[burger.id] }));
  const cartTotal = cartItems.reduce((total, burger) => total + burger.price * burger.quantity, 0);

  useEffect(() => {
    const updateScrollState = () => setIsScrolled(window.scrollY > 24);

    updateScrollState();
    window.addEventListener('scroll', updateScrollState, { passive: true });
    return () => window.removeEventListener('scroll', updateScrollState);
  }, []);

  const showNotice = (message) => {
    setCartOpen(false);
    setMobileMenuOpen(false);
    setNotice(message);
  };

  return (
    <header className={`nav${isScrolled ? ' nav--scrolled' : ''}${mobileMenuOpen ? ' nav--menu-open' : ''}`}>
      <a
        className="logo"
        href="#home"
        aria-label="Burger Lab home"
        onClick={() => setMobileMenuOpen(false)}
      >
        BURGER<span>LAB</span>
      </a>
      <button
        className="nav-menu-toggle"
        type="button"
        aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={mobileMenuOpen}
        aria-controls="main-navigation"
        onClick={() => {
          setNotice('');
          setCartOpen(false);
          setMobileMenuOpen((open) => !open);
        }}
      >
        <span />
        <span />
        <span />
      </button>
      <nav className="nav-links" id="main-navigation" aria-label="Main navigation">
        <a href="#ingredients" onClick={() => setMobileMenuOpen(false)}>Ingredients</a>
        <a href="#menu" onClick={() => setMobileMenuOpen(false)}>Menu</a>
        <button type="button" onClick={() => showNotice('Ordering is coming soon.')}>Order</button>
        <button type="button" onClick={() => showNotice('Delivery details are coming soon.')}>Delivery</button>
        <button
          className="cart-button"
          type="button"
          aria-expanded={cartOpen}
          onClick={() => {
            setNotice('');
            setMobileMenuOpen(false);
            setCartOpen((open) => !open);
          }}
        >
          Cart <span className="cart-count">{cartCount}</span>
        </button>
      </nav>
      {notice && <p className="nav-feedback" role="status">{notice}</p>}
      {cartOpen && (
        <div className="cart-popover" role="region" aria-label="Shopping cart">
          <strong>{cartCount ? 'YOUR ORDER' : 'YOUR CART IS EMPTY'}</strong>
          {cartItems.length ? (
            <>
              <ul className="cart-items">
                {cartItems.map((burger) => (
                  <li key={burger.id}>
                    <span>{burger.quantity} × {burger.name}</span>
                    <span>{formatBurgerPrice(burger.price * burger.quantity)}</span>
                  </li>
                ))}
              </ul>
              <div className="cart-total">
                <span>Subtotal</span>
                <strong>{formatBurgerPrice(cartTotal)}</strong>
              </div>
              <span className="cart-note">Freshly grilled. Checkout coming soon.</span>
            </>
          ) : (
            <span>Pick your favorite from the menu below.</span>
          )}
        </div>
      )}
    </header>
  );
}
