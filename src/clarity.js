// Microsoft Clarity (session recordings + heatmaps). Loaded only on the live site: not while
// developing locally, and not inside the /loop pages the Selected work tiles embed as iframes,
// so one visit isn't counted several times. Clarity follows client-side page changes itself.
const CLARITY_ID = 'z08wcrtwfb';

export const loadClarity = () => {
  if (!import.meta.env.PROD) return;
  if (window.top !== window || window.location.pathname.startsWith('/loop/')) return;
  (function (c, l, a, r, i, t, y) {
    c[a] =
      c[a] ||
      function () {
        (c[a].q = c[a].q || []).push(arguments);
      };
    t = l.createElement(r);
    t.async = 1;
    t.src = 'https://www.clarity.ms/tag/' + i;
    y = l.getElementsByTagName(r)[0];
    y.parentNode.insertBefore(t, y);
  })(window, document, 'clarity', 'script', CLARITY_ID);
};
