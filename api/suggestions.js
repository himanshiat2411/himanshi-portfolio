import { getStore, readJson, send, SUGGESTIONS_KEY, visitorId, withinLimit } from './_store.js';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const clean = (value, max) => (typeof value === 'string' ? value.trim().slice(0, max) : '');

// POST /api/suggestions { message, name?, email?, page?, website? }
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return send(res, 405, { error: 'Method not allowed' });
  }
  try {
    const body = await readJson(req);
    // `website` is a hidden field only bots fill in; pretend it worked.
    if (body.website) return send(res, 200, { ok: true });

    const message = clean(body.message, 1000);
    const name = clean(body.name, 80);
    const email = clean(body.email, 120);
    const page = clean(body.page, 120);
    if (message.length < 3) return send(res, 400, { error: 'Please write a little more.' });
    if (email && !EMAIL.test(email)) return send(res, 400, { error: 'That email doesn’t look right.' });

    if (!(await withinLimit('suggest', visitorId(req), 5, 60 * 60))) {
      return send(res, 429, { error: 'Thanks! That’s plenty for now — try again in a while.' });
    }

    const db = getStore();
    await db.lpush(SUGGESTIONS_KEY, JSON.stringify({ message, name, email, page, at: new Date().toISOString() }));
    await db.ltrim(SUGGESTIONS_KEY, 0, 999);
    return send(res, 200, { ok: true });
  } catch (error) {
    console.error(error);
    return send(res, 500, { error: 'Something went wrong. Please try again.' });
  }
}
