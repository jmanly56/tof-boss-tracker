const {SlashCommandBuilder} = require('discord.js');
const {BossInfo} = require('../exports/constants.js');

// Set up the command for deployment.
module.exports = {
    data: new SlashCommandBuilder()
        .setName('init')
        .setDescription('Initialize the forum posts.')
        .setDefaultMemberPermissions('32') // Member has manage server permissions.
        .setDMPermission(false)
        .addChannelOption((option) => {
            option
                .setName('channel')
                .setDescription('The channel to create the timers under.')
                .setRequired(true);
        }),

    // Execute the command.
    async execute(interaction) {
        try {
            //TODO: Create a function to check if they exist, otherwise create and store ID.
            await interaction.deferReply({ephemeral: true});
            const targetChannel = await interaction.options.getChannel(
                'channel'
            );
            const bossNames = Object.keys(BossInfo);
            var ids = {};
            for (var key in bossNames) {
                const t = await targetChannel.threads.cache.find(x => x.name === key);
                var tID;
                if (t === 'undefined') {
                    //TODO: Create thread
                } else {
                    ids[key] = t.id;
                }
            }
        } catch (error) {
            return console.log(error);
        }
    },
};
