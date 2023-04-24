const {SlashCommandBuilder} = require('discord.js');

// Set up the command for deployment.
module.exports = {
    data: new SlashCommandBuilder()
        .setName('init')
        .setDescription('Initialize the forum posts.')
        .setDefaultMemberPermissions('32') // Member has manage server permissions.
        .setDMPermission(false),

    // Execute the command.
    async execute(interaction) {
        try {
            //TODO: Create a function to check if they exist, otherwise create and store ID.
        } catch (error) {
            return console.log(error);
        }
    },
};
