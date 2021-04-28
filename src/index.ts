import { readmeCommand } from "./commands/readme";
import { helpCommand } from "./commands/help";

import { shouldParseMessage, getCommandAndArgs } from "./helper";

// Load env variables
require("dotenv").config();

import { Client, Message } from "discord.js";
const client = new Client();

async function main() {
  const token = process.env.TOKEN;
  const prefix = process.env.PREFIX!;

  client.on("ready", () => {
    console.log(`Logged in as ${client.user?.tag}`);
  });

  client.on("message", async (message: Message) => {
    if (message.mentions.has(client.user!)) {
      await helpCommand(message, []);
      return;
    }
    if (!shouldParseMessage(prefix, message)) {
      return;
    }

    console.log(message.content);

    const { args, command } = getCommandAndArgs(prefix, message);

    switch (command) {
      case "r":
        await readmeCommand(message, args);
        break;
      case "h":
      case "help":
        await helpCommand(message, args);
        break;
    }

    console.log("done");
  });

  client.login(token);
}

main();
