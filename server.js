const express = require('express');
const { bot, users, saveUsers } = require('./bot');

const app = express();

app.get('/postback', (req, res) => {
  const subid = req.query.subid;
  const event = req.query.event;

  if (!subid || event !== 'registration') {
    return res.status(400).send('Invalid postback');
  }

  const chatId = subid;

  if (users[chatId]) {
    users[chatId].confirmed = true;
    saveUsers();
    bot.sendMessage(chatId, '🎉 Спасибо за регистрацию! Доступ к сигналам открыт ✅');
    console.log(`[✅] Пользователь ${chatId} подтверждён через postback`);
  } else {
    users[chatId] = { confirmed: true };
    saveUsers();
    bot.sendMessage(chatId, '🎉 Спасибо за регистрацию! Доступ к сигналам открыт ✅');
  }

  res.status(200).send('OK');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`📡 Postback-сервер запущен на порту ${PORT}`));
