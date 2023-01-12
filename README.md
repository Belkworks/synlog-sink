
# synlog-sink

A log sink for [`rbx-log`](https://github.com/roblox-aurora/rbx-log) that writes to [`synlog`](https://github.com/Belkworks/synlog).

## Prerequisites

See [Project Setup](https://gist.github.com/safazi/b9db41b9e6517f95b0932b29aeb57df9)

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
