import { EMAIL_COMPOSE_URL } from './links';

const WIDTH = 640;
const HEIGHT = 680;

// Opens Gmail compose in a small centred popup window. Modifier clicks keep the
// browser's default (new tab), and a blocked popup falls back to a new tab.
const openCompose = event => {
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
  event.preventDefault();
  const left = Math.round(window.screenX + (window.outerWidth - WIDTH) / 2);
  const top = Math.round(window.screenY + (window.outerHeight - HEIGHT) / 2);
  const popup = window.open(
    EMAIL_COMPOSE_URL,
    'gmail-compose',
    `popup,width=${WIDTH},height=${HEIGHT},left=${left},top=${top}`
  );
  if (popup) popup.focus();
  else window.open(EMAIL_COMPOSE_URL, '_blank', 'noopener');
};

export default openCompose;
