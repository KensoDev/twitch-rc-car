const tmi = require('tmi.js'); // Twitch Real time communication
var gpio = require('rpi-gpio'); // To communicate with the PI gpio pins

const auth = process.env.AUTH;
const username = "FullStackBot";

gpio.setup(3, gpio.DIR_OUT);
gpio.setup(5, gpio.DIR_OUT);
gpio.setup(11, gpio.DIR_OUT);
gpio.setup(13, gpio.DIR_OUT);

const USERS = [];

const COMMANDS = {
  "F": [3],
  "B": [5],
  "L": [11],
  "R": [13],
  "FR": [3, 13],
  "FL": [3, 11],
  "BR": [5, 13],
  "BL": [5, 11]
}


var options = {
  options:{
    debug: true
  },
  connection:{
    cluster: "aws",
    reconnect: true
  },
  identity:{
    username: username,
    password: auth
  },
  channels: ["KensoDev"]
};

var client = new tmi.client(options);
client.connect();

client.on('chat', function(channel, userstate, message, self) {
  const username = userstate.username;

  if (USERS.includes(username)) {
    const pinNumbers = COMMANDS[message]

    if (pinNumbers) {
      on(pinNumbers)
    }
  }
});

function on(pinNumbers) {
  pinNumbers.map(function(pinNumber) {
    gpio.write(pinNumber, true);
  })

  setTimeout(function() { off(pinNumbers) }, 1200);
}

function off(pinNumbers) {
  pinNumbers.map(function(pinNumber) {
    gpio.write(pinNumber, false);
  });
}
