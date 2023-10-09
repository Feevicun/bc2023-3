const fs = require("fs").promises;

async function minvalue(jsonData) {
  let min = 10000;
  let text = "";
  for (let list of jsonData) {
    if (list.value < min) {
      min = list.value;
      text = list.txt;
    }
  }
  return `${text}:${min}`;
}

async function main() {
  try {
    const data = await fs.readFile("data.json", "utf-8");
    const jsonData = JSON.parse(data);
    const str = await minvalue(jsonData);
    await fs.writeFile("output.txt", str);
    console.log("Output.txt created successfully.");
  } catch (err) {
    console.error(err);
  }
}

main();
