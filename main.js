const fs = require('fs');

// Читання JSON з файлу
fs.readFile('data.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Помилка читання файлу:', err);
    return;
  }

  try {
    // Розбір JSON
    const jsonData = JSON.parse(data);

    // Знаходження активу з найменшим значенням
    const minAsset = findMinAsset(jsonData);

    // Запис у файл output.txt
    const outputText = `Інші резервні активи:${minAsset.value}`;
    fs.writeFile('output.txt', outputText, 'utf8', (err) => {
      if (err) {
        console.error('Помилка запису у файл:', err);
      } else {
        console.log('Результати аналізу збережено у файл output.txt');
      }
    });
  } catch (jsonError) {
    console.error('Помилка парсингу JSON:', jsonError);
  }
});

// Функція для знаходження активу з найменшим значенням
function findMinAsset(data) {
  let minAsset = { value: Infinity };

  if (Array.isArray(data)) {
    for (const item of data) {
      const currentMinAsset = findMinAsset(item);
      if (currentMinAsset.value < minAsset.value) {
        minAsset = currentMinAsset;
      }
    }
  } else if (typeof data === 'object') {
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const currentMinAsset = findMinAsset(data[key]);
        if (currentMinAsset.value < minAsset.value) {
          minAsset = currentMinAsset;
        }
      }
    }
  } else if (typeof data === 'number') {
    // Якщо це число, порівнюємо його з поточним мінімумом
    if (data < minAsset.value) {
      minAsset.value = data;
    }
  }

  return minAsset;
}
