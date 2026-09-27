import { getStore, HEARTS_KEY, send, visitorId } from './_store.js';

// GET  /api/hearts -> { count }
// POST /api/hearts -> { count, counted }  (one heart per visitor per day)
export default async function handler(req, res) {
  try {
    const db = getStore();
    if (req.method === 'GET') {
      return send(res, 200, { count: Number(await db.get(HEARTS_KEY)) || 0 });
    }
    if (req.method === 'POST') {
      const fresh = await db.set(`hearted:${visitorId(req)}`, '1', { nx: true, ex: 60 * 60 * 24 });
      const count = fresh ? await db.incr(HEARTS_KEY) : Number(await db.get(HEARTS_KEY)) || 0;
      return send(res, 200, { count, counted: Boolean(fresh) });
    }
    res.setHeader('Allow', 'GET, POST');
    return send(res, 405, { error: 'Method not allowed' });
  } catch (error) {
    console.error(error);
    return send(res, 500, { error: 'Something went wrong' });
  }
}
