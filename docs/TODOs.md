- change build script to node https://nodejs.org/en/learn/typescript/run-natively - https://nodejs.org/docs/latest-v22.x/api/cli.html#--watch
- use biome instead of eslint

- use node for testing https://nodejs.org/docs/latest-v22.x/api/test.html

### Issues didnt got fixed yet:

after switching tsx command line with following command in package.json

```sh
## before:
"dev": "node --experimental-strip-types --watch src/index.ts",
## after
"dev": "node --experimental-strip-types --watch src/index.ts",
```

- the following error appears:

```log
node --experimental-strip-types --watch src/index.ts

(node:3407) ExperimentalWarning: Type Stripping is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
node:internal/modules/esm/resolve:257
    throw new ERR_MODULE_NOT_FOUND(
          ^
Error [ERR_MODULE_NOT_FOUND]: Cannot find module
code: 'ERR_MODULE_NOT_FOUND',

Node.js v22.11.0
Failed running 'src/index.ts'

```
