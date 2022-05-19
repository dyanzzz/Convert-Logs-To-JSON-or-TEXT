const fs = require('fs');
const path = require('path');
const { convert } = require('./convert');

const filePath = process.argv[2]
const flag = process.argv[3]
const type = process.argv[4]
const flagOutput = process.argv[5]
const pathOutput = process.argv[6]
console.log(filePath)
if (filePath == "" || filePath == "-h" || filePath == undefined) {
  const help = `Help :
  Flag :
  1. -t = Translate (Translate Type Logs)
  2. -o = Open (Location Path Opened)

  Type :
  1. json
  2. text

  Example Code Covert Logs:
  1. node index.js C:/xampp/apache/logs/error.log -t json
  2. node index.js C:/xampp/apache/logs/error.log -t text
  3. node index.js C:/xampp/apache/logs/error.log -o ./newLog.json
  4. node index.js C:/xampp/apache/logs/error.log -t json -o ./newLog.json
  4. node index.js C:/xampp/apache/logs/error.log -t text -o ./newLog.text
  `;
  
  console.log(help)
} else {
  const newArr = convert(filePath)

  let newDir = path.parse(filePath).dir
  let newName = path.parse(filePath).name
  
  if (flag == "-t") {
    let newPath = newDir + '/' + newName + '.' + type
    console.log(newPath)

    if (type == "json") {
      if (flagOutput != undefined) {
        newPath = pathOutput
      }
      try {
        fs.writeFileSync(newPath, JSON.stringify(newArr, null, 2))
        console.log('Logs berhasil di convert ke JSON')
      } catch (err) {
        console.log(err.message)
      }
    }else if (type == "text") {
      if (flagOutput != undefined) {
        newPath = pathOutput
      }
      try {
        fs.writeFileSync(newPath, JSON.stringify(newArr))
        console.log('Logs berhasil di convert ke TEXT')
      } catch (err) {
        console.log(err.message)
      }
    }
  } else if (flag == "-o") {
    try {
      fs.writeFileSync(type, JSON.stringify(newArr, null, 2))
      console.log('Logs berhasil di set path saved')
    } catch (err) {
      console.log(err.message)
    }
  } else {
    try {
      fs.writeFileSync(newDir + '/' + newName, JSON.stringify(newArr))
      console.log('Logs berhasil di convert ke PLAIN')
    } catch (err) {
      console.log(err.message)
    }
  }
}