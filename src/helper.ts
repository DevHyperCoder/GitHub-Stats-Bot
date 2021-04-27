import { Message } from "discord.js";

// TODO add code splitting and lang types
export function formatCode(code: String): String {
  return `\`${code}\``;
}

// Preliminary checks
// - Is the msg from a bot ?
// - Does it start with the prefix ?
export function shouldParseMessage(prefix: string, message: Message): boolean {
  return message.content.startsWith(prefix) || !message.author.bot;
}

// Parse arguments and command
export function getCommandAndArgs(
  prefix: String,
  message: Message
): { args: Array<String>; command: String | undefined } {
  const args = message.content.slice(prefix.length).trim().split(" ");
  const command = args.shift()?.toLowerCase();

  return { args, command };
}
