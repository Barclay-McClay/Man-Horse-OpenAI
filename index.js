//OpenAI
require('dotenv').config();
const got = require('got');
//Discord------------------------------------------------------------------------------------------------
const fs = require('node:fs'); //fs is Node's native file system module. 
const { Client, Events, GatewayIntentBits } = require('discord.js');
const { Collection } = require('discord.js')
const token = process.env.DISCORD_TOKEN;	//authtoken stored in .env
const now = new Date();		//get a timestamp (for debugging)

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });


client.commands = new Collection(); //create collection to fill with commands
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js')); //read all the command files

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);								
	client.commands.set(command.data.name, command);	// Set a new item in the Collection // With the key as the command name and the value as the exported module
}


client.once('ready', () => { 		//Startup screen info
	
	console.log(now.toUTCString()); // convert date to a string in UTC timezone format
	console.log("\r\n   ___ _____ _   _ ______  _____ _____ \r\n  |_  |_   _| \\ | || ___ \\|  _  |_   _|\r\n    | | | | |  \\| || |_\/ \/| | | | | |  \r\n    | | | | | . ` || ___ \\| | | | | |  \r\n\/\\__\/ \/_| |_| |\\  || |_\/ \/\\ \\_\/ \/ | |  \r\n\\____\/ \\___\/\\_| \\_\/\\____\/  \\___\/  \\_\/  \r\n                                       \r\n                                       \r\n");
  console.log('... ... ... Online in ' + client.guilds.cache.size + ' Discord servers ... ... ...\n------------    ------------   ------------   ------------');
	client.guilds.cache.forEach(guild => {										//count & list the servers.
		console.log(`${guild.name} | Members: ${guild.memberCount}`);
	  })
	console.log('------------    ------------   ------------   ------------\n');

});

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//We're listening for interactions (slash commands)
client.on('interactionCreate', async interaction => { 
	
	//Slash Commands=========================
	if  (interaction.isCommand()){
		const command = client.commands.get(interaction.commandName);
		if (!command) return;

		if (interaction.guild !== null){
			console.log(interaction.member.displayName + ": "+ command.data.name);
		}else{
			console.log(command.data.name + " command in DM");
		}
		
		try {
			await command.execute(interaction);
		} catch (error) {
			console.error(error);
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	
	//Menu Interactions======================
	}else{
		return;
	}

});

//LOGIN TO DISCORD====
client.login(token);
//=====================