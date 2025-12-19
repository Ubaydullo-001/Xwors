const TelegramBot = require("node-telegram-bot-api");
const { createClient } = require("@supabase/supabase-js");

// Telegram bot (FAQAT 1 MARTA)
const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

// Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

bot.onText(/\/start/, async (msg) => {
  await supabase.from("users").insert({
    telegram_id: msg.from.id,
    username: msg.from.username || null
  });

  bot.sendMessage(msg.chat.id, "Bot ishlayapti ✅");
});

console.log("🤖 Bot ishga tushdi");
