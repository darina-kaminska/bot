const { bot, users } = require('./bot');
const cron = require('node-cron');

const signals = [
  '📊 Сигнал: ставь через 1 игру!',
  '🚀 Жди — скоро заход!',
  '🎯 Ставь после зелёного!',
  '🔥 Пропусти 2 раунда, потом ставь!'
];

function getRandomSignal() {
  return signals[Math.floor(Math.random() * signals.length)];
}

cron.schedule('*/5 * * * *', () => {
  Object.entries(users).forEach(([chatId, data]) => {
    if (data.confirmed) {
      bot.sendMessage(chatId, getRandomSignal());
    }
  });
});
