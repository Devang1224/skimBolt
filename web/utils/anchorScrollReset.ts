export function scrollAndReset(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault(); // prevent default jump
    const href = e.currentTarget.getAttribute('href');
    if (!href) return;
  
    const hash = href.startsWith('#')
      ? href
      : new URL(href, window.location.href).hash;
  
    if (!hash) return;
  
    const target = document.querySelector(hash);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  
    // Remove hash from URL
    history.replaceState(null, '', window.location.pathname);
  }