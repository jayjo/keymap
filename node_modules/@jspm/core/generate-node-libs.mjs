import { writeFile } from 'fs/promises';
import { builtinModules } from 'module';
import { join } from 'path';

for (const builtinModule of builtinModules) {
  await writeFile(new URL(join('nodelibs/node', `${builtinModule}.js`), import.meta.url), `\
export { default } from 'node:${builtinModule}';
export * from 'node:${builtinModule}';
`);
}
