import { useState } from 'react';
import burgerVideo from '../puplic/images/burger-home-video.mp4';

export default function HomeHero() {
  const [videoReady, setVideoReady] = useState(false);
  const [videoError, setVideoError] = useState(false);

  return (
    <section id="home" className="home-hero" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="hero-kicker"><span /> BURGER LAB — GRILL STORIES</p>
        <h1 id="hero-title">A GREAT BURGER IS THE OCCASION.</h1>
        <blockquote>
          “The best moments are made to be shared — and always taste better between two buns.”
        </blockquote>
        <p className="hero-note">SLOW-GRILLED. STACKED WITH CARE. SERVED HOT.</p>
      </div>

      <div className="hero-media" aria-hidden="true">
        {!videoReady && !videoError && <div className="film-loading" role="status">FRESH OFF THE GRILL</div>}
        {videoError && <div className="film-error" role="alert">Video unavailable. Check the bundled burger video file.</div>}
        <video
          className="hero-video"
          src={burgerVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onLoadedData={() => setVideoReady(true)}
          onError={() => setVideoError(true)}
        />
      </div>
    </section>
  );
}
