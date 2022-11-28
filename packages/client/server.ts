import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import { ViteDevServer } from 'vite';

// eslint-disable-next-line @typescript-eslint/naming-convention, no-underscore-dangle
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isProduction = process.env.NODE_ENV === 'production';

const prepareHTML = (template: string, appHtml: string, preloadedState: any) =>
  template
    .replace(`<!--ssr-outlet-->`, appHtml)
    .replace(
      `<!--app-state-->`,
      `<script>window.__PRELOADED_STATE__=${JSON.stringify(
        preloadedState
      )}</script>`
    );

const getIndexFile = () => {
  const indexFilePath = isProduction ? 'dist/client/index.html' : 'index.html';
  const indexFile = path.resolve(__dirname, indexFilePath);

  return indexFile;
};

async function createServer() {
  const app = express();
  const PORT = 3000;

  let devServer: ViteDevServer;

  if (isProduction) {
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
      const indexFile = getIndexFile();

      let template = fs.readFileSync(indexFile, 'utf-8');
      let entryModule;

      if (isProduction) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // eslint-disable-next-line import/extensions
        entryModule = await import('./dist/server/entry-server.js');
      } else {
        entryModule = await devServer.ssrLoadModule('/src/entry-server.tsx');

        template = await devServer.transformIndexHtml(url, template);
      }

      const store = entryModule.configureInitialStore();
      const preloadedState = store.getState();
      const appHtml = await entryModule.render(url, store);

      const html = prepareHTML(template, appHtml, preloadedState);

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (e: any) {
      if (!isProduction) {
        devServer.ssrFixStacktrace(e);
      }

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
