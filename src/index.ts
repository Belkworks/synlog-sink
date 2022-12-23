import { Colors, Fonts, Line, Text, Token } from "@belkworks/synlog";
import { DrawingLogger } from "@belkworks/synlog/out/class/logger";
import { LogEvent, LogLevel } from "@rbxts/log";
import { MessageTemplateParser, TemplateTokenKind } from "@rbxts/message-templates";

const logHeaders = {
	[LogLevel.Debugging]: "DEBUG",
	[LogLevel.Information]: "INFO",
	[LogLevel.Warning]: "WARN",
	[LogLevel.Error]: "ERROR",
	[LogLevel.Fatal]: "FATAL",
	[LogLevel.Verbose]: "LOG",
};

const padStart = (str: string, len: number, pad = " "): string => pad.rep(len - str.size()) + str;

let headerWidth = 0;
for (const [, v] of pairs(logHeaders)) headerWidth = math.max(headerWidth, v.size());

const paddedLogHeaders = {} as Record<LogLevel, string>;
for (const [k, v] of pairs(logHeaders)) paddedLogHeaders[k] = padStart(v, headerWidth);

const logColors = {
	[LogLevel.Debugging]: Colors.GreyGrey,
	[LogLevel.Information]: Colors.InfoBlue,
	[LogLevel.Warning]: Colors.Orange,
	[LogLevel.Error]: Colors.LightRed,
	[LogLevel.Fatal]: Colors.LightPurple,
	[LogLevel.Verbose]: Colors.White,
};

type SinkOptions = {
	label?: {
		italic?: boolean;
		font?: Font;
		color?: boolean;
	};
};

function sink(logger: DrawingLogger, opts: SinkOptions = {}) {
	const labelOpts = opts?.label;
	const labelItalic = labelOpts?.italic ?? true;
	const labelFont = labelOpts?.font ?? (labelItalic ? Fonts.Italic : Fonts.Regular);
	const labelColor = labelOpts?.color ?? true;
	const white = Colors.White;

	return (log: LogEvent) => {
		const tokens: Token[] = MessageTemplateParser.GetTokens(log.Template).map((token) => {
			if (token.kind === TemplateTokenKind.Text) return Text.white(token.text);

			const prop = log[token.propertyName];
			const str = tostring(prop);
			switch (typeOf(prop)) {
				case "number":
					return Text.color(str, Colors.Mint);
				case "string":
					// TODO: check if string is wrapped in quotes
					return Text.white(str);
				default:
					return Text.color(str, Colors.Grey);
			}
		});

		const prefix = log.SourceContext;
		if (prefix !== undefined) tokens.unshift(Text.color(`[${prefix}] `, Colors.Grey));

		tokens.unshift({
			text: paddedLogHeaders[log.Level] + " ",
			color: labelColor ? logColors[log.Level] : white,
			font: labelFont,
		});

		logger.addLine(Line.fromTokens(tokens));
	};
}

export = sink;
