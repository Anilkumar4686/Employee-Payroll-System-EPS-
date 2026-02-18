const fs = require("fs").promises;
const path = "./employees.json";

async function read() {
  try {
    const data = await fs.readFile(path, "utf-8");
    return JSON.parse(data || "[]");
  } catch (err) {
    return [];
  }
}

async function write(data) {
  try {
    await fs.writeFile(path, JSON.stringify(data, null, 2));
  } catch (err) {
    console.log("Write Error");
  }
}

module.exports = { read, write };