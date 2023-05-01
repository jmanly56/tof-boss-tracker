/* eslint-disable no-undef */
const {Events} = require('discord.js');

client.on(Events.InteractionCreate, async (interaction) => {
    try {
        if (!interaction.isButton()) return;
        if (interaction.customId === 'channelCooldown') {
            const timestamp = Date.now();
            const relativeTimer = Math.floor(timestamp / 1000 + 1800);
            interaction.reply({
                content: `Your channel cooldown ends at <t:${relativeTimer}:t>, in <t:${relativeTimer}:R>.`,
                ephemeral: true,
            });
        }
    } catch (error) {
        return console.log(error);
    }
});
