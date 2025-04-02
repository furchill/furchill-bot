require('dotenv').config();
const { Telegraf } = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);

const startCommand = require('./commands/start');
const priceCommand = require('./commands/price');
const swapCommand = require('./commands/swap');
const connectCommand = require('./commands/connect');
const swapCommand = require('./commands/swap');


bot.command('swap', swapCommand);
bot.command('connect', connectCommand);

bot.start(startCommand);
bot.command('price', priceCommand);
bot.command('swap', swapCommand);

bot.launch();
console.log('FurchillBot is live!');
