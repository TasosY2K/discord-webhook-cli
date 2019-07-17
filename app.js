const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const inquirer = require('inquirer');
const request = require('request');
var url = require('is-url');

const config = require('./config/config.js');

const args = process.argv.slice(2);

let webhook_url;
let message;

if (!args[0]){
} else if (!args[2]) {
  if (!url(args[0])) return console.log(chalk.bold("Invalid URL"));
  request({uri: args[0], method: 'POST', json: {content: args[1]}}, (err, rsp, body) => {
    if (!body) {
      console.log(chalk.green("Message was send successfuly"));
    } else {
      console.log(chalk.red("Error: " + body.message));
    }
  });
  return;
}

clear();
console.log(chalk.magenta(figlet.textSync("discord-cli", {horizontalLayout: 'full'})));
console.log(chalk.yellow.bold("A simple cli for sending messages with discord through webhook requests\n"));
console.log(`version: ${chalk.green("1.0.0")}`);
console.log(`author: ${chalk.green("L34ND3V")}`);
console.log(`github: ${chalk.green.underline("https://github.com/TasosY2K/discord-webhook-cli")}`);
console.log(`usage: ${chalk.green("node app.js <webhook url> <message>\n")}`);


inquirer.prompt(config.webhook_url).then(output => {
  webhook_url = output.webhook_url;
  inquirer.prompt(config.message).then(output => {
    message = output.message;
    request({uri: webhook_url, method: 'POST', json: {content: message}}, (err, rsp, body) => {
      if (!body) {
        console.log(chalk.green("\nMessage was send successfuly"));
      } else {
        console.log(chalk.red("\nError: " + body.message));
      }
    });
  });
});
