import { Message, MessageEmbed } from "discord.js";

export async function helpCommand(msg: Message, _: Array<String>) {
  await msg.reply("help cmd will be implemented");
  const helpEmbed = new MessageEmbed()
    .setColor("#FFFFFF")
    .setTitle("Help for Github Stats Bot")
    .addFields(
      { name: "PREFIX", value: "?" },
      { name: "help", value: "Display this help message" },
      { name: "r", value: "Show readme of github repo" }
    )
    .setURL("https://devhypercoder.com");

  msg.channel.send(helpEmbed);
}
