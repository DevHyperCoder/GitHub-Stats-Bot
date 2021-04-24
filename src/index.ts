require("dotenv").config();
const token = process.env.TOKEN;

import {Client, Message} from "discord.js";
const client = new Client();

client.on('ready',()=>{
    console.log(`Logged in as ${client.user?.tag}`);
});

client.on('message',(msg:Message) => {
    if (msg.author.bot) return ;

    msg.reply(`I read the msg ${msg.content}`);
})

client.login(token);
