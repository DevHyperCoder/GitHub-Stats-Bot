import { Message } from "discord.js";
import fetch from "node-fetch";
import { readmeErrorMsg, readmeOver2000 } from "../constants";

import { Command } from "../interfaces";
export const readmeCommand: Command = {
  name: "Readme Command",
  cmd: ["r", "readme"],
  execute: async (msg: Message, args: Array<String>) => {
    let i = args.shift();
    let matches = i?.match(
      "https?://github.com/([a-zA-Z0-9-_]+)/([a-zA-Z0-9-_]+)"
    );

    if (matches === null) {
      await msg.reply(`\`${i}\` is not a GitHub link`);
      return;
    }

    let url = matches?.shift();
    let username = matches?.shift();
    let repo_name = matches?.shift();

    msg.channel.send(
      `**Link:** \`${url}\`\n**UserName:** ${username}\n**Repository Name:** ${repo_name}`
    );

    if (repo_name === null || username === null) {
      await msg.reply("UserName / RepoName is undefined");
      return;
    }

    // TODO split messages and workaround code-tags
    // Peraps using a markdown parser is better
    const readme = await getReadmeText(username!, repo_name!);
    msg.channel.send(
      `\`\`\`md\n${readme.length > 2000 ? readmeOver2000 : readme}\`\`\``
    );
  },
};

async function getReadmeText(
  username: String,
  repoName: String
): Promise<String> {
  const resp = await fetch(`
https://raw.githubusercontent.com/${username}/${repoName}/master/README.md`);
  if (resp.status !== 200) {
    return readmeErrorMsg;
  }
  return resp.text();
}
