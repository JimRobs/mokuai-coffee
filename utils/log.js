var chalk = require('chalk');

// simple log (nocolor)
function log(value){
    console.log(value);
}
// info : green
log.info = function(value){
    console.info(chalk.green(value));
};
// warn : orange
log.warn = function(value){
    console.warn(chalk.orange(value));
};
// error : red
log.error = function(value){
    console.error(chalk.red(value));
};

module.exports = log;