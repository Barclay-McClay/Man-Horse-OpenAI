require('dotenv').config();
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('node:fs');
const token = process.env.DISCORD_TOKEN;

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));


const clientId = process.env.DISCORD_CLIENT_ID; //ID of Bot
const guildId = process.env.DISCORD_GUILD_ID;  //ID of server you wish to deploy the commands in. (This is for development)


for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
	try {
		console.log('Started refreshing application (/) commands.');
		/*
		Global application commands will be available in all the servers this bot has the applications.commands scope authorized, as well as in DMs, but it takes an hour to update.
		When ready to deploy the bot globally, use *this*:
		
		await rest.put(
			Routes.applicationCommands(clientId),
			{ body: commands },
		);
		*/

		await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();