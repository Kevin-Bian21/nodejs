const HELLO = require('./Hello');
HELLO.sayHello(HELLO.message);

//path
const path = require('path');
var pathObj = path.parse(__filename);
console.log(pathObj);

//os
const os = require('os');
const hello = require('./Hello');

const TotalMemory = os.totalmem;
const FreeMemory = os.freemem;

console.log(`total memory : ${TotalMemory / Math.pow(1024,3)} GB` );
console.log(`free memory : ${FreeMemory / Math.pow(1024,3) } GB` );

//file system
const fs = require('fs');
// 同步方法
// const file = fs.readdirSync('./');
// console.log(file);

// 异步方法
fs.readdir('./', function(err, files) {
    if (err)
        console.log(err);
    else
        console.log(files)
});
