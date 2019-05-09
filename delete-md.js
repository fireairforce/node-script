/**
 * created by zoomdong on 5.9 2019
 * delete all markdown file on the directory
 */

const fs = require('fs');
const path = require('path');
const promisify = require('util').promisify;
const read = promisify(fs.readdir)

function file(file){
    if(file.match(/\.md$/)){
        fs.unlink(file,(err)=>{
            if(err){
                throw err;
            }else {
                console.log('success delete it!');
            }
        })
    }
 }

function readFile(filepath){
    let absolutepath = path.resolve(filepath);
    read(absolutepath).then(data=>{
        data.forEach(item=>{
            fs.stat(`${absolutepath}/${item}`,(err,stats)=>{
                if(err){
                    throw err;
                }
                if(stats.isDirectory()){
                    readFile(`${absolutepath}/${item}`)
                }
                else if(stats.isFile()){
                    file(`${absolutepath}/${item}`);
                }
            })
        })
    })
}
readFile('./');