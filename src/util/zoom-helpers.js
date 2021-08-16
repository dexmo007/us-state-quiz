function createViewport(content) {
  const meta = document.createElement('meta');
  meta.setAttribute('name', 'viewport');
  meta.setAttribute('content', content);
  return meta;
}

export function resetZoom() {
  const viewport = document.querySelector('meta[name="viewport"]');
  const originalContent = viewport.getAttribute('content');
  if (viewport) {
    viewport.remove();
    document
      .querySelector('head')
      .appendChild(
        createViewport(
          'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no;'
        )
      );
    setTimeout(() => {
      const viewport = document.querySelector('meta[name="viewport"]');
      viewport.remove();
      document
        .querySelector('head')
        .appendChild(createViewport(originalContent));
    }, 10);
  }
}
