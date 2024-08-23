<div align="center">

# esbuild-plugins-node-modules-polyfill

**Polyfills nodejs builtin modules for the browser.**

[![GitHub](https://img.shields.io/github/license/imranbarbhuiya/esbuild-plugins-node-modules-polyfill)](https://github.com/imranbarbhuiya/esbuild-plugins-node-modules-polyfill/blob/main/LICENSE)
[![npm](https://img.shields.io/npm/v/esbuild-plugins-node-modules-polyfill?color=crimson&logo=npm&style=flat-square)](https://www.npmjs.com/package/esbuild-plugins-node-modules-polyfill)

</div>

## Description

Polyfills nodejs builtin modules and globals for the browser.

## Features

-   Written In Typescript
-   Offers CJS and ESM builds
-   Full TypeScript & JavaScript support
-   Supports `node:` protocol
-   Supports [`browser` field in `package.json`](https://github.com/defunctzombie/package-browser-field-spec)
-   Optionally injects globals
-   Optionally provides empty fallbacks

## Install

```bash
npm install --save-dev esbuild-plugins-node-modules-polyfill

```

## Usage

```ts
import { nodeModulesPolyfillPlugin } from 'esbuild-plugins-node-modules-polyfill';
import { build } from 'esbuild';
build({
	plugins: [nodeModulesPolyfillPlugin()],
});
```

### Inject globals when detected:

```ts
import { nodeModulesPolyfillPlugin } from 'esbuild-plugins-node-modules-polyfill';
import { build } from 'esbuild';
build({
	plugins: [
		nodeModulesPolyfillPlugin({
			globals: {
				process: true,
				Buffer: true,
			},
		}),
	],
});
```

> [!Note]
> If you are utilizing the [`modules`](#configure-which-modules-to-polyfill) option, ensure that you include polyfills for the global modules you are using.

### Configure which modules to polyfill:

```ts
import { nodeModulesPolyfillPlugin } from 'esbuild-plugins-node-modules-polyfill';
import { build } from 'esbuild';
build({
	plugins: [
		nodeModulesPolyfillPlugin({
			modules: ['crypto'],
		}),
	],
});
```

```ts
import { nodeModulesPolyfillPlugin } from 'esbuild-plugins-node-modules-polyfill';
import { build } from 'esbuild';
build({
	plugins: [
		nodeModulesPolyfillPlugin({
			modules: {
				crypto: true,
				fs: false,
			},
		}),
	],
});
```

### Provide empty polyfills:

#### Provide empty polyfills for specific modules:

```ts
import { nodeModulesPolyfillPlugin } from 'esbuild-plugins-node-modules-polyfill';
import { build } from 'esbuild';
build({
	plugins: [
		nodeModulesPolyfillPlugin({
			modules: {
				fs: 'empty',
				crypto: true,
			},
		}),
	],
});
```

#### Provide empty fallbacks for any unpolyfilled modules:

```ts
import { nodeModulesPolyfillPlugin } from 'esbuild-plugins-node-modules-polyfill';
import { build } from 'esbuild';
build({
	plugins: [
		nodeModulesPolyfillPlugin({
			fallback: 'empty',
		}),
	],
});
```

#### Provide empty fallbacks for any unconfigured modules:

```ts
import { nodeModulesPolyfillPlugin } from 'esbuild-plugins-node-modules-polyfill';
import { build } from 'esbuild';
build({
	plugins: [
		nodeModulesPolyfillPlugin({
			fallback: 'empty',
			modules: {
				crypto: true,
			},
		}),
	],
});
```

### Fail the build when certain modules are used:

> [!Important]
> The `write` option in `esbuild` must be `false` to support this.

```ts
import { nodeModulesPolyfillPlugin } from 'esbuild-plugins-node-modules-polyfill';
import { build } from 'esbuild';
const buildResult = await build({
	write: false,
	plugins: [
		nodeModulesPolyfillPlugin({
			modules: {
				crypto: 'error',
				path: true,
			},
		}),
	],
});
```

### Fail the build when a module is not polyfilled or configured:

> [!Important]
> The `write` option in `esbuild` must be `false` to support this.

```ts
import { nodeModulesPolyfillPlugin } from 'esbuild-plugins-node-modules-polyfill';
import { build } from 'esbuild';
const buildResult = await build({
	write: false,
	plugins: [
		nodeModulesPolyfillPlugin({
			fallback: 'error',
			modules: {
				path: true,
			},
		}),
	],
});
```

### Provide a custom error formatter when a module is not polyfilled or configured:

Return an esbuild `PartialMessage` object from the `formatError` function to override any properties of the default error message.

> [!Important]
> The `write` option in `esbuild` must be `false` to support this.

```ts
import { nodeModulesPolyfillPlugin } from 'esbuild-plugins-node-modules-polyfill';
import { build } from 'esbuild';
const buildResult = await build({
	write: false,
	plugins: [
		nodeModulesPolyfillPlugin({
			fallback: 'error',
			modules: {
				path: true,
			},
			formatError({ moduleName, importer, polyfillExists }) {
				return {
					text: polyfillExists
						? `Polyfill has not been configured for "${moduleName}", imported by "${importer}"`
						: `Polyfill does not exist for "${moduleName}", imported by "${importer}"`,
				};
			},
		}),
	],
});
```

## Buy me some doughnuts

If you want to support me by donating, you can do so by using any of the following methods. Thank you very much in advance!

<a href="https://www.buymeacoffee.com/parbez" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy Me A Coffee" height="41" width="174"></a>
<a href='https://ko-fi.com/Y8Y1CBIJH' target='_blank'><img height='36' style='border:0px;height:36px;' src='https://cdn.ko-fi.com/cdn/kofi4.png?v=3' border='0' alt='Buy Me a Coffee at ko-fi.com' /></a>

## Contributors ✨

Thanks goes to these wonderful people:

<a href="https://github.com/imranbarbhuiya/esbuild-plugins-node-modules-polyfill/graphs/contributors">
    <img src="https://contrib.rocks/image?repo=imranbarbhuiya/esbuild-plugins-node-modules-polyfill" />
</a>
