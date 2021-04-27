import { Message } from "discord.js";
import fetch from "node-fetch";

export async function readmeCommand(msg: Message, args: Array<String>) {
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
  msg.channel.send(
    `\`\`\`md\n${await getReadmeText(username!, repo_name!)}\`\`\``
  );
}

async function getReadmeText(
  username: String,
  repoName: String
): Promise<String> {
  const resp = await fetch(`
https://raw.githubusercontent.com/${username}/${repoName}/master/README.md`);

  return resp.text();
}
