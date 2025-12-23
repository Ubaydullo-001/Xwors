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
const supabass = require("./db");
bot.on("message", async (msg) => {
  if (!msg.text) return;
  const { error } = await supabass
    .from("messages")
    .insert([
      {
        user_id: msg.from.id,
        text: msg.text
      }
    ]);
  if (error) {
    console.log("DB error:", error);
  }
  bot.sendMessage(msg.chat.id, "✅ Ma’lumot bazaga yozildi");
});
console.log("🤖 Bot ishga tushdi");












