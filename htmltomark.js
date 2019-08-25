/**
 * created by zoomdong on 5.23 2019
 * convert html to markdown
 */

const fs = require('fs');
const path = require('path');
const promisify = require('util').promisify;
const read = promisify(fs.readdir);
const readFiles = promisify(fs.readFile);
const updown = require('upndown');
const und = new updown();

function file(file) {
    if (file.match(/\.html$/)) {
        readFiles(file,'utf-8').then((res) => {
            let type = file.split('.')[0];
            und.convert(res,(err,markdown)=>{
                if(err){
                   throw err;
                } else {
                    fs.writeFileSync(`${type}.md`,markdown);
                    fs.unlinkSync(file,(err)=>{
                        if(!err){
                            throw err;
                        } else {
                            console.log('Delete all html');
                        }
                    })
                } 
            })
        }).catch(err => {
            throw err;
        })
        //   对文件的后缀名处理
        // let type = file.split('.')[0];
        // fs.rename(`${type}.htm`,`${type}.html`,(err,data)=>{
        //     if(err){
        //         throw err;
        //     }
        // })
    }
}

function readFile(filepath) {
    let absolutepath = path.resolve(filepath);
    read(absolutepath).then(data => {
        data.forEach(item => {
            fs.stat(`${absolutepath}/${item}`, (err, stats) => {
                if (err) {
                    throw err;
                }
                if (stats.isDirectory()) {
                    readFile(`${absolutepath}/${item}`)
                } else if (stats.isFile()) {
                    file(`${absolutepath}/${item}`);
                }
            })
        })
    })
}
readFile('./');