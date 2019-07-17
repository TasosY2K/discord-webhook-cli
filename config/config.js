var url = require('is-url');

module.exports = {
  webhook_url:{
    name: 'webhook_url',
    type: 'input',
    message: "Webhook URL:",
    validate: (value) => {
      if (url(value)) {
        return true;
      } else {
        return "Please enter a valid URL";
      }
    }
  },
  message:{
    name: 'message',
    type: 'input',
    message: "Message:",
    validate: (value) => {
      if (value.length) {
        return true;
      } else {
        return "You can't send an empty message";
      }
    }
  }
}
