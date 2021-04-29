import { Message } from "discord.js";

export interface UserRepos {
  name: String;
}

export interface Command {
  name: String;
  cmd: Array<String>;
    helpLong:String,
        helpShort:String,
  execute: (msg: Message, args: Array<String>) => Promise<void>;
}
