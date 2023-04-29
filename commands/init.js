const {SlashCommandBuilder, GuildTextThreadManager} = require('discord.js');
const {BossInfo} = require('../exports/constants.js');
const {setAllIds, loadPosts, savePosts} = require('../lib/posts');

/**
 * Create a forum post for bossName.
 * @param {String} bossName
 * @param {GuildTextThreadManager} channel
 * @returns The the created thread channel.
 */
async function createPost(bossName, channel) {
    const thread = await channel.threads.create({
        name: bossName,
        reason: 'Boss timer.',
        message: 'World boss timers:',
    });
    return thread;
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
                    t = await createPost(key, targetChannel);
                }
                ids[key] = t.id;
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
