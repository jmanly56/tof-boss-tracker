// Require the necessary discord.js classes.
const {
    ActivityType,
    Client,
    Collection,
    Events,
    GatewayIntentBits,
} = require('discord.js');

// Require dotenv for environment variables.
require('dotenv').config({path: './.env.local'});

// Require native Node modules.
const fs = require('node:fs');
const path = require('node:path');

// Declare and set a Discord token from the environment variables.
const {token} = process.env.DISCORD_TOKEN;

// Create a new client instance
const client = new Client({intents: [GatewayIntentBits.Guilds]});
global.client = client;

// Log in to Discord with your client's token
client.login(process.env.token);

// Command Handling
client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    // Set a new item in the Collection with the key as the command name and the value as the exported module
    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
    } else {
        console.log(
            `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
        );
    }
}

// Event Handling
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs
    .readdirSync(eventsPath)
    .filter((file) => file.endsWith('.js'));

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}
