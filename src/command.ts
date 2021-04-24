import { Message } from "discord.js";

export async function readmeCommand(msg: Message, args: Array<String>) {
  args.forEach((i: String) => {
    if (i.includes("https://github.com/")) {
      msg.reply("Contains a link");
    }
  });
}

