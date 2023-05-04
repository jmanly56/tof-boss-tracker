/**
 * Command to manually update a timer with a specific time and date.
 */
const {SlashCommandBuilder} = require('discord.js');
const {isBoss} = require('../lib/ui');
const {setTime} = require('../lib/timers');
const
module.exports = {
    data: new SlashCommandBuilder()
        .setName('update')
        .setDescription('Update a timer for a specific time.')
        .setDefaultMemberPermissions('32') // Member has manage server permissions.
        .setDMPermission(false)
        .addStringOption((option) =>
            option
                .setName('boss')
                .setDescription('The boss timer to update.')
                .setRequired(true)
        )
        .addIntegerOption((option) =>
            option
                .setName('channel')
                .setDescription('The boss channel to set.')
                .setRequired(true)
        )
        .addStringOption((option) =>
            option
                .setName('time')
                .setDescription(
                    'The time to set, or the value. Format: DD Mmm YYYY HH:MM:SS TZ'
                )
        ),

    // Execute the command.
    async execute(interaction) {
        await interaction.deferReply({ephemeral: true});
        const boss = interation.options.getString('boss');
        const channel = interaction.options.getInteger('channel');
        const time = interaction.options.getString('time', false);

        if (isBoss(boss)) {
            let x = (time != null) ? Date.parse(time) : Date.now();
            try {
                setTime(boss, channel, time);
                //TODO: Update the message in the correct channel.
            } catch (err) {
                console.log(`Error occured trying to set boss time: ${err}`)
            }
        } else {
            await interaction.editReply('Could not find boss.');
        }
    },
};
