const fs = require('fs')


const filename = 'emoji.ts' // Same name as downloaded_filename `const filename = 'btc-price.json';`
const text = fs.readFileSync(filename, 'utf8')
const jsonString = text
    .replace(/emojis:/g, '"emojis":')
    .replace(/name:/g, '"name":')
    .replace(/icon:/g, '"icon":')
    .replace(/\'/g, '"')
    .replace(/export const EMOJIS = /gi, '{"list": ') 
    + '}';
fs.writeFileSync('emoji.json', jsonString)
try {
    const json = JSON.parse(jsonString)
}catch(e) {
    console.error(e)
}