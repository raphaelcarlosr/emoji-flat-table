// This can be a typescript file as well

// Helper library written for useful postprocessing tasks with Flat Data
// Has helper functions for manipulating csv, txt, json, excel, zip, and image files
import { readJSON, writeJSON, removeFile, readTXT } from 'https://deno.land/x/flat@0.0.10/mod.ts' 

// Step 1: Read the downloaded_filename JSON
const filename = Deno.args[0] // Same name as downloaded_filename `const filename = 'btc-price.json';`
const text = await readTXT(filename)
const jsonString = text
    .replace(/emojis:/g, '"emojis":')
    .replace(/name:/g, '"name":')
    .replace(/icon:/g, '"icon":')
    .replace(/\'/g, '"')
    .replace(/export const EMOJIS = /gi, '{"list": ') 
    + '}';

const json = JSON.parse(jsonString)
const newFilename = `emoji.json` // name of a new file to be saved
await writeJSON(newFilename, json) // create a new JSON file with just the Bitcoin price


const list = json.list
for (let i = 0, l = list.length; i < l; i++) {
    const emoji = list[i];
    const {name, emojis } = emoji;
    await writeJSON(name, emojis)    
}

// Optionally delete the original file
await removeFile(filename) // equivalent to removeFile('btc-price.json')

console.log("Wrote a post process file")