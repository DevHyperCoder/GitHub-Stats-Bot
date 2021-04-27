import { readmeCommand } from "./command";
import { shouldParseMessage, getCommandAndArgs } from "./helper";

// Load env variables
require("dotenv").config();

import { Client, Message } from "discord.js";
import { helpCommand } from "./commands/help";
const client = new Client();

async function main() {
  const token = process.env.TOKEN;
  const prefix = process.env.PREFIX!;

  client.on("ready", () => {
    console.log(`Logged in as ${client.user?.tag}`);
  });

  client.on("message", async (message: Message) => {
    if (!shouldParseMessage(prefix, message)) return;

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
  });

  client.login(token);
}

main();
