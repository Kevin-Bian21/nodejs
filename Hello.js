var message = 'Hello World!';

const hello = function(message) {
    global.console.log(message);
}

module.exports.sayHello = hello;
module.exports.message = message;