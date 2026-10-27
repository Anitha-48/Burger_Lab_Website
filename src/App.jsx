import { useState } from 'react';
import Navbar from './components/Navbar.jsx';
import HomeHero from './components/HomeHero.jsx';
import IngredientExperience from './components/IngredientExperience.jsx';
import MenuSection from './components/MenuSection.jsx';
import BurgerMoment from './components/BurgerMoment.jsx';

export default function App() {
  const [cart, setCart] = useState({});
  const [wishlist, setWishlist] = useState([]);
  const cartCount = Object.values(cart).reduce((total, quantity) => total + quantity, 0);

  const addToCart = (burgerId) => {
    setCart((currentCart) => ({
      ...currentCart,
      [burgerId]: (currentCart[burgerId] ?? 0) + 1,
    }));
  };

  const toggleWishlist = (burgerId) => {
    setWishlist((currentWishlist) => (
      currentWishlist.includes(burgerId)
        ? currentWishlist.filter((id) => id !== burgerId)
        : [...currentWishlist, burgerId]
    ));
  };

  return (
    <>
      <Navbar cart={cart} cartCount={cartCount} />
      <main>
        <HomeHero />
        <IngredientExperience />
        <MenuSection
          cart={cart}
          onAddToCart={addToCart}
          wishlist={wishlist}
          onToggleWishlist={toggleWishlist}
        />
        <BurgerMoment />
      </main>
      <footer className="site-footer" id="contact">
        <div className="site-footer__inner">
          <div className="site-footer__main">
            <div className="site-footer__brand">
              <a className="site-footer__logo" href="#home" aria-label="Burger Lab home">
                BURGER<span>LAB</span>
              </a>
              <p>Fresh off the grill.<br />Made to be shared.</p>
            </div>
            <div className="site-footer__invite">
              <p>GOOD FOOD. GREAT COMPANY.</p>
              <h2>Make Food<br />for one more.</h2>
              <a href="#menu">FIND YOUR FAVORITE <span aria-hidden="true">↗</span></a>
            </div>
          </div>
          <div className="site-footer__bottom">
            <div className="site-footer__contact-block">
              <p className="site-footer__label">COME SAY HELLO</p>
              <address className="site-footer__contact">
                <a href="tel:67565690">67565690</a>
                <a href="mailto:burugerlab@gmail.com">burugerlab@gmail.com</a>
                <span><span className="site-footer__pin" aria-hidden="true">↗</span> Chennai, India</span>
              </address>
            </div>
            <nav className="site-footer__links" aria-label="Footer navigation">
              <p className="site-footer__label">TAKE A LOOK AROUND</p>
              <a href="#ingredients">Our ingredients</a>
              <a href="#menu">The menu</a>
              <a href="#contact">Get in touch</a>
            </nav>
            <div className="site-footer__signature">
              <span>GRILLED WITH INTENTION.</span>
              <a href="#home" aria-label="Back to top">BACK TO TOP ↑</a>
            </div>
          </div>
          <div className="site-footer__legal">
            <span>© {new Date().getFullYear()} BURGER LAB</span>
            <span>FRESH OFF THE GRILL · CHENNAI, INDIA</span>
          </div>
        </div>
      </footer>
    </>
  );
}
