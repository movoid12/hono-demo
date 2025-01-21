import { apiReference } from '@scalar/hono-api-reference';

import type { OpenAPIHono } from '@hono/zod-openapi';
import packageJson from '../../../package.json';

export default function configureOpenApi(app: OpenAPIHono) {
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
