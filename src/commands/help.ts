import { Message } from "discord.js";

export async function helpCommand(msg: Message, _: Array<String>) {
  await msg.reply("help cmd will be implemented");
}
