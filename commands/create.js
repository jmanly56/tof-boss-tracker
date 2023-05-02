const {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    SlashCommandBuilder,
    StringSelectMenuBuilder,
} = require('discord.js');
const {isBoss, createChannelOptions} = require('../lib/ui');

// Set up the command for deployment.
module.exports = {
    data: new SlashCommandBuilder()
        .setName('create')
        .setDescription('Create an interactable object.')
        .setDefaultMemberPermissions('32') // Member has manage server permissions.
        .setDMPermission(false)
        .addStringOption((option) =>
            option
                .setName('bossmenu')
                .setDescription('The boss timer menu you wish to create.')
                .setRequired(true)
        ),

    // Execute the command.
    async execute(interaction) {
        try {
            // Remove the command's reply.
            await interaction.deferReply({ephemeral: true});
            await interaction.deleteReply();
            // Find the user-specified values of the command.
            const boss = interaction.options.getString('bossmenu');

            if (isBoss(boss)) {
                // Make a buton that replies with a countdown of the user's channel change.
                const buttonRow = new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                        .setCustomId('channelCooldown')
                        .setLabel(`Channel Cooldown Timer`)
                        .setStyle(ButtonStyle.Secondary)
                );
                // Cache the channel the interaction came from.
                // eslint-disable-next-line no-undef
                const channel = client.channels.cache.get(
                    interaction.channelId
                );
                const select = new ActionRowBuilder().addComponents(
                    new StringSelectMenuBuilder()
                        .setCustomId(`${boss}Select`)
                        .setPlaceholder('Channel')
                        .addOptions(createChannelOptions(boss))
                );
                await channel.send({
                    components: [buttonRow, select],
                });
            } else {
                await interaction.editReply(`Error: Boss ${boss} not found.`);
            }
        } catch (error) {
            return console.log(error);
        }
    },
};
