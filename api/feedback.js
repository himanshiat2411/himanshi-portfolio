import { timingSafeEqual } from 'node:crypto';

import { getStore, HEARTS_KEY, send, SUGGESTIONS_KEY } from './_store.js';

const matches = (given, expected) => {
  const a = Buffer.from(given || '');
  const b = Buffer.from(expected || '');
  return a.length === b.length && a.length > 0 && timingSafeEqual(a, b);
};

// GET /api/feedback with header `x-feedback-key` -> { hearts, suggestions }  (owner only)
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return send(res, 405, { error: 'Method not allowed' });
  }
  const expected = process.env.FEEDBACK_KEY || (process.env.VERCEL ? '' : 'local-dev-key');
  if (!matches(req.headers['x-feedback-key'], expected)) return send(res, 401, { error: 'Wrong key' });
  try {
    const db = getStore();
    const [hearts, raw] = await Promise.all([db.get(HEARTS_KEY), db.lrange(SUGGESTIONS_KEY, 0, -1)]);
    const suggestions = raw.map(item => (typeof item === 'string' ? JSON.parse(item) : item));
    return send(res, 200, { hearts: Number(hearts) || 0, suggestions });
  } catch (error) {
    console.error(error);
    return send(res, 500, { error: 'Something went wrong' });
  }
}
