import { readmeCommand } from "./command";

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
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(" ");
    const command = args.shift()?.toLowerCase();

    switch (command) {
      case "r":
        await readmeCommand(message, args);
        break;
    }
  });

  client.login(token);
}

main();
