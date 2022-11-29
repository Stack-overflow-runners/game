import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import express, { NextFunction, Request, Response } from 'express';
import { ViteDevServer } from 'vite';

const PROD_INDEX_FILE_PATH = 'dist/client/index.html';
const DEV_INDEX_FILE_PATH = 'index.html';

const PROD_ENTRY_MODULE_PATH = './dist/server/entry-server.js';
const DEV_ENTRY_MODULE_PATH = '/src/entry-server.tsx';

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

const getTemplate = (): string => {
  const indexFilePath = isProduction
    ? PROD_INDEX_FILE_PATH
    : DEV_INDEX_FILE_PATH;
  const indexFile = path.resolve(__dirname, indexFilePath);
  const template = fs.readFileSync(indexFile, 'utf-8');

  return template;
};

const errorHandler = (error: any, req: Request, res: Response) => {
  res.status(500).end(error.stack);
};

const errorLogger = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // eslint-disable-next-line no-console
  console.log(error);

  next(error);
};

async function createServer() {
  const app = express();
  const PORT = 3000;

  let devServer: ViteDevServer;

  if (isProduction) {
    const compression = await import('compression');
    const dist = path.resolve(__dirname, 'dist/client');

    const serveStatic = await import('serve-static');
    const serveStaticOptions = {
      index: false,
    };

    app.use(compression.default());
    app.use(serveStatic.default(dist, serveStaticOptions));
  } else {
    const vite = await import('vite');

    devServer = await vite.createServer({
      server: { middlewareMode: true },
      appType: 'custom',
    });

    app.use(devServer.middlewares);
  }

  const render = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const url = req.originalUrl;

      let template = getTemplate();
      let entryModule;

      if (isProduction) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // eslint-disable-next-line import/extensions
        entryModule = await import(PROD_ENTRY_MODULE_PATH);
      } else {
        entryModule = await devServer.ssrLoadModule(DEV_ENTRY_MODULE_PATH);

        template = await devServer.transformIndexHtml(url, template);
      }

      const store = entryModule.configureInitialStore();
      const preloadedState = store.getState();
      const appHtml = await entryModule.render(url, store);

      const html = prepareHTML(template, appHtml, preloadedState);

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (error: any) {
      next(error);
    }
  };

  app.use('*', render, errorLogger, errorHandler);

  return { app, PORT };
}

createServer().then(({ app, PORT }) =>
  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`App on http://localhost:${PORT}`);
  })
);
