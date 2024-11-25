// ? Plugin source https://github.com/aleclarson/vite-tsconfig-paths

import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  //* after debugging the failed test I needed to add the plugin following the instruction here:
  //* https://vitest.dev/guide/common-errors
  plugins: [tsconfigPaths()],
});
