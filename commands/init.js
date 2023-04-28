const {SlashCommandBuilder, GuildTextThreadManager} = require('discord.js');
const {BossInfo} = require('../exports/constants.js');
const {setAllIds, loadPosts, savePosts} = require('../lib/posts');

/**
 *
 * @param {String} bossName
 * @param {GuildTextThreadManager} channel
 * @returns The id of the created thread channel.
 */
async function createPost(bossName, channel) {
    const thread = await channel.threads.create({
        name: bossName,
        reason: 'Boss timer.',
        message: 'World boss timers:',
    });
    return thread.id;
}

// Set up the command for deployment.
module.exports = {
    data: new SlashCommandBuilder()
        .setName('init')
        .setDescription('Initialize the forum posts.')
        .setDefaultMemberPermissions('32') // Member has manage server permissions.
        .setDMPermission(false)
        .addChannelOption((option) =>
            option
                .setName('channel')
                .setDescription('The channel to create the timers under.')
                .setRequired(true)
        ),

    // Execute the command.
    async execute(interaction) {
        loadPosts();
        try {
            await interaction.deferReply({ephemeral: true});
            const targetChannel = await interaction.options.getChannel(
                'channel'
            );
            const bossNames = Object.keys(BossInfo).reverse();
            console.log(bossNames);
            var ids = {};
            for (var key in bossNames) {
                key = bossNames[key];
                const t = await targetChannel.threads.cache.find(
                    (x) => x.name === key
                );
                if (typeof t === 'undefined') {
                    ids[key] = await createPost(key, targetChannel);
                    console.log(ids[key]);
                } else {
                    ids[key] = t.id;
                }
            }
            setAllIds(ids);
            savePosts();
            await interaction.editReply('Sucessfully initialized.');
        } catch (error) {
            await interaction.editReply(
                'There was an error processing the request, contact moderator.'
            );
            return console.log(error);
        }
    },
};
