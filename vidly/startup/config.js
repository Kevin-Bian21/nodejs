const config = require('config');

module.exports = function() {
    // if jwtPrivateKey environment param not defined , process should exit;
    if (!config.get("jwtPrivateKey")) {
        throw new Error('ERROR : jwtPrivateKey is not defined!');
    }
}