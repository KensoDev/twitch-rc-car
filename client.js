const tmi = require('tmi.js'); // Twitch Real time communication
var gpio = require('rpi-gpio'); // To communicate with the PI gpio pins

const auth = process.env.AUTH;
const username = "FullStackBot";

// BLUE Car
gpio.setup(3, gpio.DIR_OUT);
gpio.setup(5, gpio.DIR_OUT);
gpio.setup(11, gpio.DIR_OUT);
gpio.setup(13, gpio.DIR_OUT);


// RED Car
gpio.setup(12, gpio.DIR_OUT);
gpio.setup(16, gpio.DIR_OUT);
gpio.setup(18, gpio.DIR_OUT);
gpio.setup(22, gpio.DIR_OUT);

const COMMANDS = {
  "1F": [3],
  "1B": [5],
  "1L": [11],
  "1R": [13],
  "1FR": [3, 13],
  "1FL": [3, 11],
  "1BR": [5, 13],
  "1BL": [5, 11],
  "2F": [18],
  "2B": [22],
  "2L": [12],
  "2R": [16],
  "2FR": [18, 16],
  "2FL": [18, 12],
  "2BR": [22, 16],
  "2BL": [22, 12]
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
  console.log(`Message: ${message}, Username: ${username}`)

  const pinNumbers = COMMANDS[message]

  if (pinNumbers) {
    on(pinNumbers)
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
