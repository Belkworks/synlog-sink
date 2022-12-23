
# synlog-sink

A log sink for [`rbx-log`](https://github.com/roblox-aurora/rbx-log) that writes to [`synlog`](https://github.com/Belkworks/synlog).

## Prerequisites

Ensure the following line is in your `.npmrc`:

```ini
@belkworks:registry=https://npm.pkg.github.com
```

Example available [here](https://github.com/Belkworks/synlog-sink/blob/master/.npmrc).

## Installation

With [`pnpm`](https://pnpm.io/):

```sh
pnpm add @belkworks/synlog-sink
```

With npm:

```sh
npm install @belkworks/synlog-sink
```

## Usage

```ts
import { Synlog } from "@belkworks/synlog";
import sink from "@belkworks/synlog-sink";
import Log, { Logger } from "@rbxts/log";

Log.SetLogger(
	Logger.configure()
		.WriteToCallback(sink(Synlog))
		.Create(),
);
```
