import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import { ViteDevServer } from 'vite';

// eslint-disable-next-line @typescript-eslint/naming-convention, no-underscore-dangle
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const prepareHTML = (template: string, appHtml: string, preloadedState: any) =>
  template
    .replace(`<!--ssr-outlet-->`, appHtml)
    .replace(
      `<!--app-state-->`,
      `<script>window.__PRELOADED_STATE__=${JSON.stringify(
        preloadedState
      )}</script>`
    );

async function createServer(isProd = process.env.NODE_ENV === 'production') {
  const app = express();
  const PORT = 3000;

  let devServer: ViteDevServer;

  if (isProd) {
    const compression = await import('compression');
    const serveStatic = await import('serve-static');
    const dist = path.resolve(__dirname, 'dist/client');

    app.use(compression.default());
    app.use(
      serveStatic.default(dist, {
        index: false,
      })
    );
  } else {
    const vite = await import('vite');

    devServer = await vite.createServer({
      server: { middlewareMode: true },
      appType: 'custom',
    });

    app.use(devServer.middlewares);
  }

  app.use('*', async (req, res) => {
    try {
      const url = req.originalUrl;

      let template;
      let render;
      let configureInitialStore;

      if (isProd) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // eslint-disable-next-line import/extensions
        const module = await import('./dist/server/entry-server.js');
        const rootFile = path.resolve(__dirname, 'dist/client/index.html');

        template = fs.readFileSync(rootFile, 'utf-8');

        render = module.render;

        configureInitialStore = module.configureInitialStore;
      } else {
        const module = await devServer.ssrLoadModule('/src/entry-server.tsx');
        const rootFile = path.resolve(__dirname, 'index.html');

        template = fs.readFileSync(rootFile, 'utf-8');
        template = await devServer.transformIndexHtml(url, template);

        render = module.render;

        configureInitialStore = module.configureInitialStore;
      }

      const store = configureInitialStore();
      const preloadedState = store.getState();
      const appHtml = await render(url, store);

      const html = prepareHTML(template, appHtml, preloadedState);

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (e: any) {
      if (!isProd) devServer.ssrFixStacktrace(e);

      res.status(500).end(e.stack);
    }
  });

  return { app, PORT };
}

createServer().then(({ app, PORT }) =>
  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`App on http://localhost:${PORT}`);
  })
);
