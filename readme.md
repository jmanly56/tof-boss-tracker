### Tower of Fantasy Discord Boss Tracker Bot
## About

This bot tracks defeated bosses by boss and channel in an easy-to use way. Simply click the boss in a forum channel list, then select the channel the boss was defeated in to update the tracker for everyone. You can also display a personal channel change cooldown to keep track of who will change next when chaining bosses. Screenshots are below.

## Pre-requisites
A Discord account with [developer mode enabled](https://support.discord.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID-) and Node.JS.
If you're not familiar with Node.JS or working with developer applications and Bots on Discord, please see [this guide](https://discordjs.guide/preparations) and follow the sections below.  
* [Installing Node.js](https://discordjs.guide/preparations/#installing-node-js)  
* [Setting up a bot application](https://discordjs.guide/preparations/setting-up-a-bot-application.html)  
* [Adding your bot to servers](https://discordjs.guide/preparations/adding-your-bot-to-servers.html)

## Initial Bot Setup:
1. Clone or [download](https://github.com/SloneFallion/tof-boss-tracker/archive/refs/heads/main.zip) the repository.
2. Edit `.env` to supply the necessary values.
3. In a terminal, change to the directory.
4. Run `npm install discord.js dotenv`.
5. Run `node deploy.js` to deploy commands.
6. Run `node index.js` to start the bot (for automatic startup and recovery, I recommend [PM2](https://pm2.keymetrics.io)).

## Discord Setup:
1. Create a new forum in your Discord server and give it the following permissions:  
* Everyone:
  * Deny ALL
* Bot
  * Allow Send Messages in Posts
  * Allow Embed Links
  * Allow Read Post History

2. For each boss:
Create a forum post with the title of the boss and your preferred picture of the boss.  
Note: If you want the boss tracker forum to be sorted alphabetically, it is recommended that you set the forum sort order to Creation Time, then post the bosses  alphabetically reversed (Z-A).

3. For each boss:
Use the /say command to issue placeholder messages. You need a placeholder for each channel, then an extra placeholder for the sorted list.  
`/say message:Time not set.`  
Use the /interaction command after the placeholder messages have been created.  
`/interaction create:Boss Timer bossmenu:<boss>`

## Configuring the Bot
1. Shut down the bot.
2. Edit `exports/bossMessageID.js` and copy the placeholder message ID's of each boss to the corresponding to their order (first to last message). The last placeholder message ID before the interaction menu does not need to be obtained/configured.

## Production
1. Start the bot.
2. Set the forum permissions as follows:
* Everyone:
  * Deny ALL
  * Allow View Channel
  * Allow Read Post History
  * Allow Create Invite at your discretion
* Bot
  * No changes

You're ready to go!

## Future Changes
If and when channels are removed or added from servers (usually after a patch), the files `commands/interaction.js` and `exports/bossMessageID.js` will need to be updated to reflect the channel availability.  

Specifically for adding new channels, placeholder messages may need to be regenerated for formatting reasons, as it will not show contiguously if new messages are added. Step 3 of Discord Setup, as well as both steps in Configuring the BOT will need to be repeated.  

## Suggestion
Using an internal persistent database would save a lot of manual work on future updates regarding channel changes. Additionally, a single message embed could be used rather than many individual messages, which would allow for easy formatting changes. At this time, such a change is not being actively developed by me.

## Screenshots
[![](https://i.imgur.com/DkLXWBt.png)](https://i.imgur.com/DkLXWBt.png)
[![](https://i.imgur.com/ralv6Ay.png)](https://i.imgur.com/ralv6Ay.png)

## License
[MPL-2.0](https://choosealicense.com/licenses/mpl-2.0/)