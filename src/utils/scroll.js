// Smooth-scroll to a point (0..1) of the pinned burger sequence.
export function scrollToProgress(p) {
  const el = document.getElementById('experience');
  if (!el) return;
  const distance = el.offsetHeight - window.innerHeight;
  window.scrollTo({ top: el.offsetTop + distance * p, behavior: 'smooth' });
}
export function scrollToFooter() {
  document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' });
}
