const { SlashCommandBuilder } = require('discord.js');

// Set up the command for deployment.
module.exports = {
	data: new SlashCommandBuilder()
		.setName('say')
		.setDescription('Say a short message through the BOT..')
		.setDefaultMemberPermissions('32') // Member has manage server permissions.
		.setDMPermission(false)
		.addStringOption(option =>
			option.setName('message')
				.setDescription('What you want the BOT to say.')
				.setRequired(true)),

	// Execute the command.
	async execute(interaction) {
		try {
			// Cache and set the channel.
			const channel = client.channels.cache.get(interaction.channelId);
			// Remove the command's reply.
			await interaction.deferReply({ ephemeral: true });
			await interaction.deleteReply();
			// Emulate typing.
			await channel.sendTyping();
			// Send the message.
			await channel.send(interaction.options.getString('message'));
		} catch (error) {
			return console.log(error);
		}
	},
};
