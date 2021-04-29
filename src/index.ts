import { readmeCommand } from "./commands/readme";
import { helpCommand } from "./commands/help";
import { userRepoCommand } from "./commands/userRepos";

import { shouldParseMessage, getCommandAndArgs } from "./helper";

// Load env variables
require("dotenv").config();

import { Client, Message } from "discord.js";
import { Command } from "./interfaces";
const client = new Client();

async function main() {
  const token = process.env.TOKEN;
  const prefix = process.env.PREFIX!;

  const commandList: Command[] = [readmeCommand, helpCommand, userRepoCommand];

  client.on("ready", () => {
    console.log(`Logged in as ${client.user?.tag}`);
  });

  client.on("message", async (message: Message) => {
    if (message.mentions.has(client.user!)) {
      await helpCommand.execute(message, []);
      return;
    }
    if (!shouldParseMessage(prefix, message)) {
      return;
    }

    console.log(message.content);

    const { args, command } = getCommandAndArgs(prefix, message);
    let index = 0;

    for (index = 0; index < commandList.length; index++) {
      let c = commandList[index];
      if (c.cmd.includes(command!)) {
        await c.execute(message, args);
        break;
      }
    }

    console.log("done");
  });

  client.login(token);
}

main();
