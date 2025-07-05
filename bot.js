const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');

const token = '8186553250:AAEHCZd02dG6dNjQDUNMrRq9ohaNbdezg7A';
const bot = new TelegramBot(token, { polling: true });

let users = {};
try {
  users = JSON.parse(fs.readFileSync('users.json', 'utf8'));
} catch (e) {
  users = {};
}

function saveUsers() {
  fs.writeFileSync('users.json', JSON.stringify(users, null, 2));
}

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, '👋 Ты уже зарегистрировался в 1win по моей ссылке?', {
    reply_markup: {
      inline_keyboard: [
        [{ text: '✅ Да, я зарегистрировался', callback_data: 'registered' }],
        [{ text: '❌ Нет, я ещё не зарегистрировался', callback_data: 'not_registered' }],
      ]
    }
  });
});

bot.on('callback_query', (query) => {
  const chatId = query.message.chat.id;
  const data = query.data;

  if (data === 'not_registered') {
    const refLink = `https://1win.com/?open=register&partner=123456&subid=${chatId}`;
    users[chatId] = { confirmed: false };
    bot.sendMessage(chatId, `🔗 Зарегистрируйся по ссылке: \n${refLink}\n\nКак только зарегистрируешься, я это увижу автоматически 😉`);
  }

  if (data === 'registered') {
    if (users[chatId]?.confirmed) {
      bot.sendMessage(chatId, '✅ Ты уже подтверждён! Готов получать сигналы!');
    } else {
      bot.sendMessage(chatId, '🔄 Мы проверим твою регистрацию по ссылке. Обычно это занимает 1–2 минуты.');
    }
  }

  saveUsers();
  bot.answerCallbackQuery(query.id);
});

// Экспорт для сервера
module.exports = { bot, users, saveUsers };
