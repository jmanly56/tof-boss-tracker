const {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    SlashCommandBuilder,
    StringSelectMenuBuilder,
} = require('discord.js');

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
                .addChoices(
                    // {name: 'Apophis', value: 'apophisMenu'},
                    // {name: 'Barbarossa', value: 'barbarossaMenu'},
                    // {name: 'Culton', value: 'cultonMenu'},
                    // {name: 'Devourer', value: 'devourerMenu'},
                    // {name: 'Dragon', value: 'dragonMenu'},
                    // {name: 'Eva', value: 'evaMenu'},
                    // {name: 'Frost Bot', value: 'frostbotMenu'},
                    // {name: 'Haboela', value: 'haboelaMenu'},
                    // {name: 'Harrah', value: 'harrahMenu'},
                    // {name: 'Lucia', value: 'luciaMenu'},
                    // {name: 'Magma', value: 'magmaMenu'},
                    // {name: 'Robarg', value: 'robargMenu'},
                    // {name: 'Rudolph', value: 'rudolphMenu'},
                    // {name: 'Scylla', value: 'scyllaMenu'},
                    // {name: 'Sobek', value: 'sobekMenu'}
                )
        ),

    // Execute the command.
    async execute(interaction) {
        try {
            // Remove the command's reply.
            await interaction.deferReply({ephemeral: true});
            await interaction.deleteReply();
            // Find the user-specified values of the command.
            const object = interaction.options.getString('create');
            const bossMenu = interaction.options.getString('bossmenu');
            if (object === 'bossTimerMenu') {
                // Make a buton that replies with a countdown of the user's channel change.
                const channelCooldownButton =
                    new ActionRowBuilder().addComponents(
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
                // await channel.send({
                //     components: [channelCooldownButton, sobekSelector],
                // });
            }
        } catch (error) {
            return console.log(error);
        }
    },
};
