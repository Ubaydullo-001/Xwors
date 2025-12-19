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
bot.on("message", async (msg) => {
  const chatId = msg.chat.id.toString();

  await supabase
    .from("users")
    .insert([{ chat_id: chatId }]);
});
const { data, error } = await supabase
  .from("users")
  .select("*");

console.log(data);

console.log("🤖 Bot ishga tushdi");

