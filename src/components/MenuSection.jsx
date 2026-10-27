import { menuBurgers, formatBurgerPrice } from '../data/menuBurgers.js';

function BurgerIllustration({ burger }) {
  return (
    <div className={`burger-art burger-art--${burger.id}`} role="img" aria-label={`${burger.name} burger illustration`}>
      <div className="burger-art__stack">
        {burger.layers.map((layer, index) => (
          <span className={`burger-art__layer burger-art__layer--${layer}`} key={`${layer}-${index}`} />
        ))}
      </div>
      <span className="burger-art__shadow" />
    </div>
  );
}

function HeartIcon({ filled }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill={filled ? 'currentColor' : 'none'}>
      <path d="M20.8 4.9a5.5 5.5 0 0 0-7.8 0L12 5.9l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.3 1-1a5.5 5.5 0 0 0 0-7.8Z" />
    </svg>
  );
}

export default function MenuSection({ cart, onAddToCart, wishlist, onToggleWishlist }) {
  return (
    <section className="menu-section" id="menu" aria-labelledby="menu-title">
      <div className="menu-section__inner">
        <header className="menu-heading">
          <p className="menu-kicker"><span /> THE BURGER LAB MENU</p>
          <h2 id="menu-title">Find your <em>favorite.</em></h2>
          <p className="menu-intro">Four hand-built stacks. Fresh from our grill to your table.</p>
        </header>

        <div className="burger-grid">
          {menuBurgers.map((burger, index) => {
            const isWishlisted = wishlist.includes(burger.id);
            const quantity = cart[burger.id] ?? 0;

            return (
              <article className="burger-card" key={burger.id}>
                <div className={`burger-card__visual burger-card__visual--${burger.id}`}>
                  <span className="burger-card__number">{String(index + 1).padStart(2, '0')}</span>
                  <span className="burger-card__tag">{burger.tag}</span>
                  <img
                    className="burger-card__image"
                    src={burger.image}
                    alt={burger.imageAlt}
                    loading="lazy"
                    decoding="async"
                    onError={(event) => {
                      event.currentTarget.hidden = true;
                    }}
                  />
                  <button
                    className={`burger-card__wish${isWishlisted ? ' is-active' : ''}`}
                    type="button"
                    aria-label={`${isWishlisted ? 'Remove' : 'Add'} ${burger.name} ${isWishlisted ? 'from' : 'to'} wishlist`}
                    aria-pressed={isWishlisted}
                    onClick={() => onToggleWishlist(burger.id)}
                  >
                    <HeartIcon filled={isWishlisted} />
                  </button>
                  <BurgerIllustration burger={burger} />
                </div>

                <div className="burger-card__details">
                  <p className="burger-card__category">{burger.category}</p>
                  <div className="burger-card__title-row">
                    <h3>{burger.name}</h3>
                    <span className="burger-card__price">{formatBurgerPrice(burger.price)}</span>
                  </div>
                  <p className="burger-card__description">{burger.description}</p>
                  <button
                    className="burger-card__add"
                    type="button"
                    onClick={() => onAddToCart(burger.id)}
                  >
                    <span>{quantity ? `ADD ANOTHER · ${quantity} IN CART` : 'ADD TO CART'}</span>
                    <span aria-hidden="true">+</span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>
        <p className="menu-footnote">PRICES IN INR · MADE FRESH TO ORDER</p>
      </div>
    </section>
  );
}
