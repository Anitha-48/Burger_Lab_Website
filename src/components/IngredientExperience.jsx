import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ingredientCopy = [
  {
    layer: '01 / THE FOUNDATION',
    name: 'The toasted base',
    detail: 'A golden, lightly toasted bottom bun gives every layer a warm, sturdy start.',
  },
  {
    layer: '02 / THE MAIN EVENT',
    name: 'Flame-grilled beef',
    detail: 'A juicy, char-kissed patty brings the deep, savory flavor straight from the grill.',
  },
  {
    layer: '03 / THE MELT',
    name: 'Melted cheddar',
    detail: 'Rich cheddar melts over the hot patty for a silky, golden blanket in every bite.',
  },
  {
    layer: '04 / THE FRESH LAYERS',
    name: 'Tomato & greens',
    detail: 'Juicy tomato, crisp lettuce and fresh coriander bring a bright, garden-fresh crunch.',
  },
  {
    layer: '05 / THE FINISH',
    name: 'The sesame crown',
    detail: 'A soft sesame-seed top bun settles everything into one unforgettable burger.',
  },
];

const INGREDIENT_VIDEO = '/images/layer-burger-scrub.mp4';

export default function IngredientExperience() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const activeIndexRef = useRef(0);
  const [videoReady, setVideoReady] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!videoReady || !section || !video || !Number.isFinite(video.duration) || video.duration <= 0) {
      return undefined;
    }

    const playhead = { time: 0 };
    const seekInterval = 1 / 30;
    let lastSeekTime = Number.NEGATIVE_INFINITY;
    const seekVideoToPlayhead = () => {
      if (video.seeking || Math.abs(video.currentTime - playhead.time) < seekInterval) {
        return;
      }

      video.currentTime = playhead.time;
      lastSeekTime = playhead.time;
    };
    const handleVideoSeeked = () => seekVideoToPlayhead();
    video.addEventListener('seeked', handleVideoSeeked);
    const context = gsap.context(() => {
      const master = gsap.timeline({ defaults: { ease: 'none' } });
      master.to(playhead, {
        time: video.duration,
        duration: 1,
        onUpdate: () => {
          const progress = playhead.time / video.duration;
          if (Math.abs(playhead.time - lastSeekTime) >= seekInterval || progress <= 0 || progress >= 1) {
            seekVideoToPlayhead();
          }

          const nextIndex = Math.min(
            ingredientCopy.length - 1,
            Math.floor(progress * ingredientCopy.length),
          );
          if (nextIndex !== activeIndexRef.current) {
            activeIndexRef.current = nextIndex;
            setActiveIndex(nextIndex);
          }
        },
      });

      ScrollTrigger.create({
        animation: master,
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        invalidateOnRefresh: true,
      });
    }, section);

    const refresh = () => ScrollTrigger.refresh();
    let frame = window.requestAnimationFrame(refresh);
    const handleResize = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(refresh);
    };
    window.addEventListener('load', refresh);
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('load', refresh);
      window.removeEventListener('resize', handleResize);
      window.cancelAnimationFrame(frame);
      video.removeEventListener('seeked', handleVideoSeeked);
      context.revert();
      video.pause();
    };
  }, [videoReady]);

  const ingredient = ingredientCopy[activeIndex];
  const sideClass = activeIndex % 2 === 0 ? 'ingredients-copy--left' : 'ingredients-copy--right';

  return (
    <section
      id="ingredients"
      className="ingredients-track"
      ref={sectionRef}
      aria-label="Scroll-controlled burger ingredients"
    >
      <div className="ingredients-stage">
        <video
          ref={videoRef}
          className="ingredients-video"
          src={INGREDIENT_VIDEO}
          muted
          playsInline
          preload="auto"
          aria-label="Burger ingredients assembling layer by layer"
          onLoadedMetadata={(event) => {
            const video = event.currentTarget;
            if (Number.isFinite(video.duration) && video.duration > 0) {
              video.currentTime = 0;
              setVideoReady(true);
            }
          }}
          onError={() => setVideoError(true)}
        />
        <div className="ingredients-video-shade" aria-hidden="true" />
        {!videoReady && !videoError && <div className="ingredients-loading" role="status">PREPARING THE STACK</div>}
        {videoError && (
          <div className="ingredients-error" role="alert">
            The ingredient video could not be loaded from <code>public/images/layer-burger-scrub.mp4</code>.
          </div>
        )}

        <div className={`ingredients-copy ${sideClass}`} aria-live="polite" aria-atomic="true">
          <p className="ingredients-kicker"><span /> BUILT LAYER BY LAYER</p>
          <div className="ingredient-story">
            <p className="ingredient-count">
              <span>{String(activeIndex + 1).padStart(2, '0')}</span>
              <i />
              <span>{String(ingredientCopy.length).padStart(2, '0')}</span>
            </p>
            <p className="ingredient-layer" key={`${ingredient.layer}-label`}>{ingredient.layer}</p>
            <h2 className="ingredient-title" key={`${ingredient.name}-title`}>{ingredient.name}</h2>
            <p className="ingredient-detail" key={`${ingredient.name}-detail`}>{ingredient.detail}</p>
          </div>
          <div className="ingredient-progress" aria-hidden="true">
            <span style={{ transform: `scaleX(${(activeIndex + 1) / ingredientCopy.length})` }} />
          </div>
          <p className="ingredients-scroll-note">SCROLL TO BUILD YOUR BITE</p>
        </div>
      </div>
    </section>
  );
}
