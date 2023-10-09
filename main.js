const fs = require('fs');

fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Помилка читання JSON-файлу:', err);
        return;
    }

    const jsonData = JSON.parse(data);

 
    const minItem = jsonData.reduce((min, current) => (
        current.value < min.value ? current : min
    ));

    const minText = minItem.txt;
    const minValue = minItem.value;


    const outputData = `Назва активу: ${minText}\nЗначення: ${minValue}\n`;

    fs.writeFile('output.txt', outputData, 'utf8', (err) => {
        if (err) {
            console.error('Помилка запису до файлу output.txt:', err);
            return;
        }
        console.log('Дані записано у файл output.txt успішно.');
    });
});




