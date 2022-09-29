const chalk = require("chalk");

class Logger {
  constructor(options) {
    this.options = options;
  }

  log(...args) {
    console.log(chalk.green(`[${new Date().toLocaleString()}]`, ...args));
  }

  error(...args) {
    console.error(chalk.red(`[${new Date().toLocaleString()}]`, ...args));
  }

  warn(...args) {
    console.warn(chalk.yellow(`[${new Date().toLocaleString()}]`, ...args));
  }

  info(...args) {
    console.info(chalk.blue(`[${new Date().toLocaleString()}]`, ...args));
  }

  debug(...args) {
    if (this.options.debug) {
      console.debug(chalk.magenta(`[${new Date().toLocaleString()}]`, ...args));
    } else {
      this.log(...args);
    }
  }
}

module.exports = Logger;
