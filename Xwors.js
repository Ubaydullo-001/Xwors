const TelegramBot = require("node-telegram-bot-api");
const { createClient } = require("@supabase/supabase-js");
const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY);
bot.onText(/\/start/, async (msg) => {
  await supabase.from("users").insert({
    telegram_id: msg.from.id,
    username: msg.from.username || null });
  bot.sendMessage(msg.chat.id, "Bot ishlayapti ✅");});
const TelegramBot = require("node-telegram-bot-api");
const token = process.env.BOT_TOKEN; // Railway / Render env dan oladi
const bot = new TelegramBot(token, { polling: true });
bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;
  if (!text || text.startsWith("/")) return;
  const link = `@Olimov`;
  bot.sendMessage(chatId, `🔍 "${text}" uchun havola:`, {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "👉 Ochish",
            url: link
          }
        ]
      ]
    }
  });
});
console.log("🤖 Bot ishga tushdi");

// bot.on("message", async (msg) => {
//   const chatId = msg.chat.id.toString();

//   await supabase
//     .from("users")
//     .insert([{ chat_id: chatId }]);
// });
// const { data, error } = await supabase
//   .from("users")
//   .select("*");

// console.log(data);

console.log("🤖 Bot ishga tushdi");


