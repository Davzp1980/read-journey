export function enableScroll() {
  document.body.style.position = '';
  document.body.style.width = '';
}

export function disableScroll() {
  document.body.style.position = 'fixed';
  document.body.style.width = '100%';
}
