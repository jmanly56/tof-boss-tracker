const { EmbedBuilder, Events, GuildMemberManager, GuildMemberRoleManager } = require('discord.js');

client.on(Events.InteractionCreate, async interaction => {
    try {
        if (!interaction.isStringSelectMenu()) return;
        // Acknowledge the menu interaction.
        await interaction.deferUpdate();
        // Reset the menu.
        await interaction.editReply({ content: '' });
        // Generate a timestamp based on when the user interacted with the menu.
        const timestamp = Date.now();
        // Obtain message ID's for the boss timers. These should be set in advance.
        const bossTimers = require('../exports/bossMessageID.js')
        // Read the value of the menu interaction.
        const selected = interaction.values[0];
        // Cache and set the channel that the interaction came from.
        const channel = client.channels.cache.get(interaction.channelId);
        // Set the boss chanel number based on the interaction choice value minus the words.
        let channelNumber = selected.match(/\d+/g);
        // Match the selected value from the menu interaction to a key in '../exports/bossMessageID.js'.
        let bossTimerID = bossTimers.bossTimers.find(r => r.key === selected) || { key: "error", value: `Something went wrong or this item is not yet finished. The BOT author has been notified.` }
        // Fetch the message by the ID matched from the previous operation.
        await channel.messages.fetch(bossTimerID.messageID).then(message => {
            // Edit the message with the channel selected, relative and absolute timestamp (timezone-agnostic), and the user that selected the interaction.
            message.edit(`Channel ${channelNumber}: <t:${Math.floor(timestamp / 1000)}:t>, <t:${Math.floor(timestamp / 1000)}:R> (<@!${interaction.user.id}>).`);
        })
        // Add a one second delay to be sure Discord has marked the message as edited before we fetch the message list.
        setTimeout(async function () {
            // Fetch the message list from the channel the interaction came from.
            const messages = await channel.messages.fetch();
            // Find and store the second-to-last message in the channel.
            const messageSortedByTime = messages.first(2)[1]
            // Sort and store all of the messages received by last edited.
            const sortedMessages = messages.sort((a, b) => {
                return b.editedTimestamp - a.editedTimestamp
            }).map(message => {
                return {
                    content: message.content,
                    messageid: message.id
                }
            })
            // Print the content of each message to a single variable. Skip the second-to-last message stored earlier. Also skip any empty messages. This includes pictures and menu select embeds.
            const reducedMessages = sortedMessages.filter(msg => msg.content !== '' && msg.messageid !== messageSortedByTime.id
            ).reduce((acc, msg) => {
                return { content: acc.content + "\n" + msg.content }
            })
            // Post the sorted list in an edit to the second-to-last message in the channel.
            messageSortedByTime.edit(`**Sorted by Last Killed:** \n${reducedMessages.content}`);
        }, 1000 * 1)
        // If there is a broken menu, DM the BOT maintainer.
        if (bossTimerID.key === 'error') {
            // Send a DM to the bot maintainer.
            client.users.send(`${process.env.botmaintainer}`, `User **<@${interaction.user.id}>** *(${interaction.user.username}#${interaction.user.discriminator})* requested incomplete or broken menu item ${selected}.`);
            console.log(`User **<@${interaction.user.id}>** *(${interaction.user.username}#${interaction.user.discriminator})* requested incomplete or broken menu item ${selected}.`);
        }
    } catch (error) {
        return console.log(error);
    }
});