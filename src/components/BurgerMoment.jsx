import { useState } from 'react';
import eatingVideo from '../puplic/images/girlbabay-burger.mp4';

export default function BurgerMoment() {
  const [videoError, setVideoError] = useState(false);

  return (
    <section className="burger-moment" aria-labelledby="burger-moment-title">
      <div className="burger-moment__inner">
        <div className="burger-moment__media">
          {!videoError ? (
            <video
              className="burger-moment__video"
              src={eatingVideo}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label="A happy burger bite"
              onError={() => setVideoError(true)}
            />
          ) : (
            <div className="burger-moment__fallback" role="status">
              FRESH FROM THE GRILL. MADE TO MAKE YOU SMILE.
            </div>
          )}
          <div className="burger-moment__shade" aria-hidden="true" />
          <span className="burger-moment__stamp">A LITTLE BITE OF JOY</span>
        </div>

        <div className="burger-moment__copy">
          <p className="burger-moment__kicker"><span /> THE BURGER MOMENT</p>
          <h2 id="burger-moment-title">
            That first bite.
            <em> Pure happiness.</em>
          </h2>
          <blockquote>
            “A little spicy, a lot delicious — and worth slowing down for.”
          </blockquote>
          <p className="burger-moment__note">
            Fresh off the grill, stacked with flavor, and best enjoyed your way.
          </p>
          <a className="burger-moment__link" href="#menu">
            FIND YOUR FAVORITE <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
