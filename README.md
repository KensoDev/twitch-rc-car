# Twitch chat remote controlled car

RC car controlled by the Twitch chat in real time.

## Project management

The trello for the game is managed here: [Crazy RC Cars Twitc](https://trello.com/b/kJhQotPV/crazy-car-racing-game)

## Ideas / Comments

If you have an idea for the game, please feel free to add it as an issue or open up a PR.


## Upcoming features

The car game is under development, these are the upcoming features I am going
to be implementing.


### Queue management (User based control)

Command: `NEXT`. Whoever typed that command will go into the queue to control
the car.

The bot will tell you when it's time for you to control the car and which TEAM
are you on.

### Queue management (Commands spacing)

In order to solve the problem of stream dealy, the commands will not go to the
cars immediately but actually go into a queue every 10 seconds and then, get
dumped to the cars at the same time.

#### Flow:

Commands typed in 10 seconds

```
F
FR
B
BL
F
FR
FR
FL
F
F
```

The car goes through the commands one by one and sends the command it's
currently executing to the server, which will display the data in real time.



