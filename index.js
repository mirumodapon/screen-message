let query;
let textarea;
let span;

function init() {
  textarea = document.querySelector('main>textarea');
  span = document.querySelector('main>span');

  textarea.addEventListener('input', adjust);
  textarea.addEventListener('paste', adjust);
  window.addEventListener('resize', adjust);

  query = new URLSearchParams(window.location.search);

  textarea.value = query.get('t') ?? '';
  query.get('t') && (textarea.value = query.get('t'));
  query.get('c') && (textarea.style.color = query.get('c'));
  query.get('b') && (textarea.style.backgroundColor = query.get('b'));

  adjust();
}

function adjust() {
  const value = textarea.value;
  span.textContent = value[value.length - 1] == '\n' ? value + '.' : value;

  const ratio = Math.min(
    window.innerWidth / span.offsetWidth,
    window.innerHeight / span.offsetHeight
  );

  textarea.style.fontSize = Math.floor(30 * ratio) + 'px';

  textarea.style.paddingTop = Math.floor((window.innerHeight - span.offsetHeight * ratio) / 2) + 'px';
  textarea.style.paddingBottom = Math.floor((window.innerHeight - span.offsetHeight * ratio) / 2) + 'px';

  textarea.value ? query.set('t', textarea.value) : query.delete('t');
  window.history.replaceState({}, '', `?${query.toString()}`);
}

document.addEventListener('DOMContentLoaded', init);
