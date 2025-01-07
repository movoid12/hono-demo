import type { Hook } from '@hono/zod-openapi';
import { httpStatusCode } from '../utils/constants';

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const defaultHook: Hook<any, any, any, any> = (result, c) => {
  if (!result.success) {
    return c.json(
      {
        success: result.success,
        error: result.error,
      },
      httpStatusCode.UNPROCESSABLE_ENTITY,
    );
  }
};

export default defaultHook;
