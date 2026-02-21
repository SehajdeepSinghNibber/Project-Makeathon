const fs = require('fs');
const path = 'c:/Users/sehaj/Desktop/Nivesh Assist/client/src/data/distribution.json';
let content = fs.readFileSync(path, 'utf8');

// Simple regex to find unquoted keys in JSON-like structure
// Matches {key: or ,key:
content = content.replace(/([{,]\s*)([a-zA-Z_]\w*)\s*:/g, '$1"$2":');

fs.writeFileSync(path, content);
console.log('Fixed distribution.json');
