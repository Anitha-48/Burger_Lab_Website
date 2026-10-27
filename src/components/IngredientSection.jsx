import { memo } from 'react';

function IngredientSection({ section }) {
  return (
    <article className={`panel panel--${section.side}`} data-id={section.id}>
      <div className="panel-inner">
        <p className="kicker">{section.kicker}</p>
        <h2>{section.title}</h2>
        <p className="lead">{section.text}</p>
      </div>
    </article>
  );
}
export default memo(IngredientSection);
