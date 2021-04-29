import { Message } from "discord.js";

export interface UserRepos {
  name: String;
}

export interface Command {
  name: String;
  cmd: Array<String>;
  execute: (msg: Message, args: Array<String>) => Promise<void>;
}
