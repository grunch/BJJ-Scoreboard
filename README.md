# BJJ Scoreboard

> [!WARNING]
> ## ⚠️ 🚨 THIS PROJECT IS DEPRECATED 🚨 ⚠️
>
> **BJJ Scoreboard is no longer maintained.** This project has evolved into **[Choke](https://github.com/protolayer-io/choke)** 🥋
>
> **Choke** is a mobile app (Android & iOS, built with Flutter and Rust) to create, score and publish Brazilian Jiu-Jitsu matches in real time over the [Nostr](https://nostr.com) protocol — no accounts needed, all match data is published as open, verifiable decentralized events. It supports scoring for takedowns, guard passes, positions and penalties, with a configurable countdown timer and audible alerts.
>
> It comes with a companion project, **[Choke Scoreboard](https://github.com/protolayer-io/choke-scoreboard)**: a real-time web scoreboard that subscribes to matches over Nostr and displays live scores, perfect for spectators and tournament projection screens.
>
> 👉 Check them out:
> - **Choke (mobile scoring app):** https://github.com/protolayer-io/choke
> - **Choke Scoreboard (live web viewer):** https://github.com/protolayer-io/choke-scoreboard

## Overview
This is a websockets Brazilian Jiu-Jitsu scoreboard, we use it in our academy to teach to our BJJ practitioners how to count points in a tournament fight, there are some solutions online, but none fit our needs, so I built one.

With this software you can control the scoreboard from a mobile, tablet or any other device in the same wifi network. Hope it's useful to someone.

![Scoreboard](./media/scoreboard.gif?raw=true "Scoreboard")

## Install
    git clone https://github.com/grunch/BJJ-Scoreboard.git
    cd BJJ-Scoreboard
    npm install
## Start

    npm start
The system will be running on port 3000, so you just need to go to this url http://localhost:3000

Now you need to let know to other users in your same network your IP address to let them operate the scoreboard, then they just need to write on their browser http://your-ip-address:3000

## Screens
The app have two screens, the main screen is meant to be used in big screens and the mobile screen, for smaller screens.
### Main screen
![Scoreboard](./media/BJJ-Scoreboard.png?raw=true "Scoreboard")
### Mobile screen
![Scoreboard](./media/mobile.png?raw=true "Scoreboard")

To access to the mobile screen control mode you just click on the top right wolf logo on the main screen, this will redirect you to http://localhost:3000/control

## License
This software is open source, you can use it and modify without asking permission, to know more about it you can read the [license](LICENSE)
