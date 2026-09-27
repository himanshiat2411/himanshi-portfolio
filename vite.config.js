import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Dev only: serve the Vercel functions in /api from the Vite server, so the feedback
// widget works on localhost without the Vercel CLI. On Vercel they run as functions.
const localApi = () => ({
  name: 'local-api',
  configureServer(server) {
    server.middlewares.use('/api', async (req, res, next) => {
      const name = req.url.split('?')[0].replace(/^\/+|\/+$/g, '');
      if (!/^[a-z-]+$/.test(name)) return next();
      try {
        const { default: handler } = await server.ssrLoadModule(`/api/${name}.js`);
        await handler(req, res);
      } catch (error) {
        if (error?.code === 'ERR_LOAD_URL' || /Failed to load url/.test(error?.message)) return next();
        console.error(error);
        res.statusCode = 500;
        res.end('API error');
      }
    });
  }
});

export default defineConfig({
  plugins: [react(), localApi()]
});
