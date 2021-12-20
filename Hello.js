var message = 'Hello World!';
const EventEmitter = require('events');

const hello = function(message) {
    global.console.log(message);
}


class Logger extends EventEmitter {
    log() {
        console.log('Hello, EventEmitter');

        this.emit('messageLogged', {id : 1, url : 'http://'})
    }
}

module.exports.sayHello = hello;
module.exports.message = message;
module.exports.Logger = Logger;