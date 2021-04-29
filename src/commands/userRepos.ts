import { Message } from "discord.js";
import UserRepos from "src/interfaces";
import fetch from "node-fetch";

export async function userReposCommand(msg: Message, args: Array<String>) {
  let i = args.shift();
  let matches = i?.match("https?://github.com/([a-zA-Z0-9-_]+)");

  if (matches === null) {
    await msg.reply(`${i} is not a  github user`);
    return;
  }

  let url = matches?.shift();
  let username = matches?.shift();

  msg.channel.send(`Link :- ${url}\n Username :- ${username}`);

  if (username === null) {
    await msg.reply("Username is undefined");
    return;
  }
  const userRepos = await getUserRepos(username!);
  msg.channel.send(`
		${userRepos}
			 `);
}

async function getUserRepos(username: String): Promise<String | String[]> {
  const req = await fetch(`
		https://api.github.com/users/${username}/repos
			      `);
  const res: Array<UserRepos> = await req.json();
  const data = res.map((e: UserRepos) => {
    return `${e.name} \n`;
  });

  return `Repos :- ${data}`;
}
