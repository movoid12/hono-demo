### Prerequisites:

- Node.js 22
- pnpm
- Eslint Extension in your VSCode

to start:

```yml
pnpm install

pnpm dev
```

to lint, execute tests and check types use the following commands:

```sh [pnpm]
pnpm lint

pnpm test

pnpm test:types
```

## Folder Structure

```yml
src/
├── lib/
├── middleware/
├── openapi/
├── routes/
├── utils/
├── app.ts // hono configs and index routes type
└── index.ts // web server configs
```

Check out:

```py
// API-INDEX:
http://localhost:3000

// API Documentation:
http://localhost:3000/reference

// API Doc:
http://localhost:3000/doc
```
