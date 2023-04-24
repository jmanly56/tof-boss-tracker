const {SlashCommandBuilder} = require('discord.js');

// Set up the command for deployment.
module.exports = {
    // Define the command.
    data: new SlashCommandBuilder()
        .setName('about')
        .setDescription('Provides bot origin and maintainer info.')
        .setDefaultMemberPermissions('2147483648') // Member has "Use Slash Commands" permission.
        .setDMPermission(false),

    // Execute the command.
    async execute(interaction) {
        try {
            await interaction.reply({
                content: `This bot was created by Slone#0110 with some help from hazen#7037.
In-game: Arkondriel, commander of the Cat crew on Solaris.
On this server, the bot is maintained by <@${process.env.botmaintainer}>.`,
                ephemeral: true,
            });
        } catch (error) {
            return console.log(error);
        }
    },
};
