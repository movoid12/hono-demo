// hono client rpc example
// needs to be tested on a monorepo to share types between server and client

import { hc } from 'hono/client';
import type { AppType } from '../app';

const client = hc<AppType>('http://localhost:3000/');

//* this is useful to be used in a monorepo
//* and has possibilty to generate an fully type-safe sdk and call an api from the client side

export default client;
