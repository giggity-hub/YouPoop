const testFolder = './tests/';
const fs = require('fs');

const index = fs.readdirSync('./farts').map(fileName => `/farts/${fileName}`);
fs.writeFileSync('farts-index.json', JSON.stringify(index))