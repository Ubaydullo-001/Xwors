const TelegramBot = require("node-telegram-bot-api");
const { createClient } = require("@supabase/supabase-js");

// Bot va Supabase ulanishi
const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// /start komandasi
bot.onText(/\/start/, async (msg) => {
  await supabase.from("users").insert({
    telegram_id: msg.from.id,
    username: msg.from.username || null
  });

  bot.sendMessage(msg.chat.id, "Salom! Bot ishlayapti ✅");
});

// Foydalanuvchi har qanday xabar yuborsa
bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (!text || text.startsWith("/")) return;

  const link = `https://t.me/olimov_me`; // Bu yerga sizning linkingiz

  // Inline tugma bilan javob yuborish
  bot.sendMessage(chatId, `🔍 Ma'lumot: ${text}`, {
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

  // Bazaga yozish
  const { error } = await supabase.from("messages").insert([
    {
      user_id: msg.from.id,
      text: text
    }
  ]);

  if (error) console.log("DB error:", error);
});

// Webhookni o‘chirish
bot.deleteWebhook();

console.log("🤖 Bot ishga tushdi");
