require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");
const { createClient } = require("@supabase/supabase-js");

// 🔐 Telegram bot
const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

// 🗄 Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// /start komandasi → user saqlanadi
bot.onText(/\/start/, async (msg) => {
  const { error } = await supabase.from("users").insert({
    telegram_id: msg.from.id,
    username: msg.from.username || null,
  });

  if (error) console.log("User insert error:", error);

  bot.sendMessage(msg.chat.id, "👋 Botga xush kelibsiz!");
});

// 🔔 HAR QANDAY XABARGA — LINKLI BUTTON
bot.on("message", async (msg) => {
  const chatId = msg.chat.id;

  // buyruqlarni o'tkazib yuboramiz
  if (!msg.text || msg.text.startsWith("/")) return;

  // DB ga xabar yozamiz
  const { error } = await supabase.from("messages").insert({
    user_id: msg.from.id,
    text: msg.text,
  });

  if (error) console.log("DB error:", error);

  // tugmali javob
  bot.sendMessage(chatId, "👇 Oyatni ochish uchun tugmani bosing", {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "📖 Oyatni ochish",
            url: "https://t.me/olimov_me",
          },
        ],
      ],
    },
  });
});

console.log("🤖 Bot ishga tushdi");
