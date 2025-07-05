function generateCrash() {
  const chance = Math.random();

  if (chance < 0.9) {
    // 90% — значение до 10
    return (Math.random() * 9 + 1).toFixed(2);  // от 1 до 10
  } else {
    // 10% — значение от 10 до 100
    return (Math.random() * 90 + 10).toFixed(2); // от 10 до 100
  }
}

function main() {
  console.log('💥 Lucky Jet Predictor Bot 💥');
  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });

  function ask() {
    readline.question('Нажми Enter, чтобы предсказать следующий коэффициент... ', () => {
      const prediction = generateCrash();
      console.log(`🎯 Предсказание: ${prediction}x\n`);
      ask();
    });
  }

  ask();
}

main();
