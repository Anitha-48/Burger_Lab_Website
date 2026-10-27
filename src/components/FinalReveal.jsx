import { memo } from 'react';
import { scrollToFooter, scrollToProgress } from '../utils/scroll.js';

function FinalReveal() {
  return (
    <article className="panel panel--final" data-id="final">
      <h2>YOUR PERFECT BURGER.</h2>
      <div className="cta">
        <button className="btn" onClick={scrollToFooter}>EXPLORE THE MENU</button>
        <button className="btn btn--ghost" onClick={() => scrollToProgress(0)}>BUILD ANOTHER</button>
      </div>
    </article>
  );
}
export default memo(FinalReveal);
