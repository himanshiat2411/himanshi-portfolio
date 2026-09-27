// Shared helpers for the feedback API (files starting with "_" are not routes on Vercel).
import { createHash } from 'node:crypto';

import { Redis } from '@upstash/redis';

// Upstash Redis when its env vars are set (Vercel adds them when you connect the database).
// Locally, without them, an in-memory store stands in so the widget can be tried out.
const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

const memoryStore = () => {
  const data = new Map();
  const expiry = new Map();
  const alive = key => {
    if (expiry.has(key) && expiry.get(key) < Date.now()) {
      data.delete(key);
      expiry.delete(key);
    }
    return data.has(key);
  };
  return {
    async get(key) {
      return alive(key) ? data.get(key) : null;
    },
    async incr(key) {
      const next = (alive(key) ? Number(data.get(key)) : 0) + 1;
      data.set(key, next);
      return next;
    },
    async expire(key, seconds) {
      expiry.set(key, Date.now() + seconds * 1000);
    },
    async set(key, value, { nx, ex } = {}) {
      if (nx && alive(key)) return null;
      data.set(key, value);
      if (ex) expiry.set(key, Date.now() + ex * 1000);
      return 'OK';
    },
    async lpush(key, value) {
      const list = alive(key) ? data.get(key) : [];
      list.unshift(value);
      data.set(key, list);
      return list.length;
    },
    async ltrim(key, start, stop) {
      if (alive(key)) data.set(key, data.get(key).slice(start, stop + 1));
    },
    async lrange(key, start, stop) {
      return alive(key) ? data.get(key).slice(start, stop === -1 ? undefined : stop + 1) : [];
    }
  };
};

let store;
export const getStore = () => {
  if (store) return store;
  if (url && token) store = new Redis({ url, token });
  else if (!process.env.VERCEL) store = memoryStore();
  else throw new Error('Feedback storage is not configured: connect an Upstash Redis database in Vercel.');
  return store;
};

// Visitors are identified only by a salted hash of their IP, never the IP itself.
export const visitorId = req => {
  const forwarded = req.headers['x-forwarded-for'];
  const ip = (Array.isArray(forwarded) ? forwarded[0] : forwarded || '').split(',')[0].trim() || req.socket?.remoteAddress || '';
  const salt = process.env.FEEDBACK_SALT || process.env.FEEDBACK_KEY || 'local-dev';
  return createHash('sha256').update(`${salt}:${ip}`).digest('hex').slice(0, 32);
};

// Allows `limit` hits per `seconds` window for one visitor.
export const withinLimit = async (name, id, limit, seconds) => {
  const db = getStore();
  const key = `rl:${name}:${id}`;
  const count = await db.incr(key);
  if (count === 1) await db.expire(key, seconds);
  return count <= limit;
};

export const readJson = async req => {
  if (req.body !== undefined) return typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {};
  let raw = '';
  for await (const chunk of req) {
    raw += chunk;
    if (raw.length > 20000) throw new Error('Body too large');
  }
  return raw ? JSON.parse(raw) : {};
};

export const send = (res, status, payload) => {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(payload));
};

export const HEARTS_KEY = 'feedback:hearts';
export const SUGGESTIONS_KEY = 'feedback:suggestions';
