import { Message, MessageEmbed } from "discord.js";
import { formatCode } from "../helper";
import { Command } from "../interfaces";

export const helpCommand: Command = {
  name: "Help command",
  cmd: ["h", "help"],
  execute: async (msg: Message, _: Array<String>) => {
    const helpEmbed = new MessageEmbed()
      .setColor("#FFFFFF")
      .setTitle("Help for Github Stats Bot")
      .setDescription(
        `
**Command List**
${formatCode("Prefix")}: ?
${formatCode("h or help")}: Show this help command
${formatCode("r <gh link>")}: Show readme of the given github repo
    `
      )
      .setFooter(`Requested by ${msg.author.tag}`)
      .setURL("https://devhypercoder.com");

    msg.channel.send(helpEmbed);
  },
};
