const fs = require("fs").promises;

async function minvalue(jsonData) {
  let min = 10000;
  let text = "";
  for (let asset of jsonData) {
    if (asset.value < min) {
      min = asset.value;
      text = asset.txt;
    }
  }
  return `${text}:${min}`;
}

async function main() {
  try {
    const data = await fs.readFile("data.json", "utf-8");
    const jsonData = JSON.parse(data);
    const str = await minvalue(jsonData);
    await fs.writeFile("output.txt", str, "utf-8");
    console.log("Output.txt створено успішно.");
  } catch (err) {
    console.error(err);
  }
}

main();
