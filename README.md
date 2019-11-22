# BJJ Scoreboard

## Overview
This is a websockets Brazilian Jiu-Jitsu scoreboard, we use it in our academy to teach to our BJJ practitioners how to count points in a tournament fight, there are some solutions online, but none fit our needs, so I built one.

With this software you can control the scoreboard from a mobile, tablet or any other device in the same wifi network. Hope it's useful to someone.

![Scoreboard](./scoreboard.gif?raw=true "Scoreboard")

## Install
    git clone https://github.com/grunch/BJJ-Scoreboard.git
    cd bjj-scoreboard
    npm install
## Start

    npm start
The system will be running on port 3000, so you just need to go to this url http://localhost:3000

Now you need to let know to other users in your same network your IP address to let them operate the scoreboard, then they just need to write on their browser http://your-ip-address:3000
## License
This software is open source, you can use it and modify without asking permission, to know more about it you can read the [license](LICENSE)
