const {ActivityType, Events} = require('discord.js');
const {loadTimers} = require('../lib/timers');
const {loadPosts} = require('../lib/posts');

module.exports = {
    name: Events.ClientReady,
    once: true,
    async execute(client) {
        loadPosts();
        loadTimers();
        // Set activity
        client.user.setActivity('Tower of Fantasy', {
            type: ActivityType.Playing,
        });
        // Announce that the BOT is ready.
        console.log(`Ready! Logged in as ${client.user.tag}`);
    },
};
