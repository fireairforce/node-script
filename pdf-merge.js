const pdfmerge = require('pdf-merge')
const fs = require('fs')
const path = require('path')

const dirname = path.resolve(__dirname, './input')

// let files = fs.readdirSync(dirname)

// files = files.filter(item => item.indexOf('pdf') !== -1)

// for (let i = 0; i < files.length; i++) {
//   files[i] = `${dirname}/${files[i]}`
//   fs.renameSync(`${files[i]}`, `${i}.pdf`)
// }

let output = path.resolve(__dirname, './output/')
let fileName = `final-${Date.now()}.pdf`

let readFiles = fs.readdirSync(dirname)

for (let i = 0; i < readFiles.length; i++) {
  readFiles[i] = `${dirname}/${readFiles[i]}`
}

readFiles = readFiles.slice(1)

pdfmerge(readFiles, { output: `${output}${fileName}` }).then(() => {
  console.log(`merge successfully`);
})
