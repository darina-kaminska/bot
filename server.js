const express = require('express');
const { bot, users, saveUsers, sendSignal } = require('./bot');

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
  } else {
    users[chatId] = { confirmed: true };
  }
  saveUsers();

  bot.sendMessage(chatId, '🎉 Спасибо за регистрацию! Доступ к сигналам открыт ✅');
  sendSignal(chatId);

  console.log(`[✅] Пользователь ${chatId} подтверждён через postback`);

  res.status(200).send('OK');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`📡 Postback-сервер запущен на порту ${PORT}`));


app.get('/postback', (req, res) => {
  const subid = req.query.subid;
  const event = req.query.event;

  if (!subid || event !== 'registration') {
    return res.status(400).send('Invalid postback');
  }

  if (users[subid]) {
    users[subid].confirmed = true;
    saveUsers();
    bot.sendMessage(subid, '🎉 Спасибо за регистрацию! Доступ к сигналам открыт ✅');
  } else {
    users[subid] = { confirmed: true };
    saveUsers();
    bot.sendMessage(subid, '🎉 Спасибо за регистрацию! Доступ к сигналам открыт ✅');
  }

  res.status(200).send('OK');
});
