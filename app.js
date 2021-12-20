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
const file = fs.readdirSync('./');
console.log(file);
// 异步方法
fs.readdir('./', function(err, files) {
    if (err)
        console.log(err);
    else
        console.log(files)
});


// EventEmitter
const EventEmitter = require('events');
const emitter = new EventEmitter();

// First listener
emitter.on('event', function firstListener() {  // on 和 addListener 函数功能一样
    console.log('Helloooo! first listener');
});
  // Second listener
emitter.on('event', function secondListener(arg1, arg2) {
    console.log(`event with parameters ${arg1}, ${arg2} in second listener`);
});
// Third listener
emitter.on('event', function thirdListener(...args) {
    const parameters = args.join(', ');
    console.log(`event with parameters ${parameters} in third listener`);
});

//按注册顺序同步调用为名为 eventName 的事件注册的每个侦听器，并将提供的参数传递给每个侦听器。 如果事件有侦听器，则返回 true，否则返回 false
emitter.emit('event',1, 2, 3, 4, 5);  // 触发事件


// 使用继承实现在不同模块监听事件。
const Logger = HELLO.Logger;
const logger = new Logger();

logger.on('messageLogged', (args) => console.log('Listener : ' + args.url));
logger.log();


// http
const http = require('http');
http.createServer((req, res) => {
    if (req.url === '/') {
        res.write('Hello World!');
        res.end();
    }

    if (req.url === '/api/getPeoples') {
        res.write(JSON.stringify({1:'Kecin', 2 :'Tom', 3 : 'Jack'}));
        res.end();
    }
}).listen(3000);

console.log('listening on port 3000...')


const server = http.createServer();
server.on('connection', (socket, req, res) => console.log('Hello Node'))
server.listen(2000);

