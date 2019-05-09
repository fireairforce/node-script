/**
 * created by zoomdong on 2019 5.9 
 * 主要用于linux下更改名称乱码的文件
 */

const fs = require('fs');

let getNum =  (str,isFilter) =>{
        isFilter = isFilter || false;
        if (typeof str === "string") {
            var arr = str.match( isFilter ? /[1-9]\d{1,}/g : /\d{2,}/g);
            return arr?arr.map(function (item) {
                return item;
            }):[];
        } else {
            return [];
        }
    }

let files = fs.readdirSync('./')
let names = [];
for(let i = 0;i<files.length;i++){
    getNum(files[i]).length!==0?names.push(parseInt(...getNum(files[i]))):names.push(" ");
}
for(let i = 0;i<files.length;i++){
    if(names[i]===' '){
        continue;
    }
    fs.rename(`./${files[i]}`,`${names[i]}.pdf`,err=>{
        if(err){
            throw err;
        } else {
            console.log('changed success');
        }
    })
}



