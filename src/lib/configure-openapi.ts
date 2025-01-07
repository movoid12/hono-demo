import { apiReference } from '@scalar/hono-api-reference';

import packageJson from '../../package.json';
import type { OpenAPIHono } from '@hono/zod-openapi';

export default function configureOpenAPI(app: OpenAPIHono) {
  app
    .doc('/doc', {
      openapi: '3.0.0',
      info: {
        title: 'Demo API',
        version: packageJson.version,
      },
    })
    .get(
      '/reference',
      apiReference({
        spec: {
          url: '/doc',
        },
        layout: 'classic',
        theme: 'kepler',
        defaultHttpClient: {
          targetKey: 'javascript',
          clientKey: 'fetch',
        },
      }),
    );
}
