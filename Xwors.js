const TelegramBot = require("node-telegram-bot-api");
const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    "Befarosat bot sanga qattan maqsad beradi!😒😡🤬"
  );
});
const TelegramBot = require("node-telegram-bot-api");
const { createClient } = require("@supabase/supabase-js");

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

bot.onText(/\/start/, async (msg) => {
  await supabase.from("users").insert({
    telegram_id: msg.from.id,
    username: msg.from.username
  });

  bot.sendMessage(msg.chat.id, "Bot ishlayapti ✅");
});

console.log("🤖 Telegram bot ishga tushdi");
