const { SlashCommandBuilder, ActionRow } = require('@discordjs/builders');
const { EmbedBuilder, MessageActionRow, MessageSelectMenu, MessageButton } = require('discord.js');
const fs = require('node:fs');

module.exports = {

    //-------------------------------------------------
	data: new SlashCommandBuilder()
		.setName('help')                                      //<----SET THE command name to be  the same as this file's name.js
		.setDescription('List commands'),                   //this is how discord will describe the command to the user

    //-------------------------------------------------
    //----------------------------------------------------------------------------------------------------------------------
	async execute(interaction) {//

    const embed =  new EmbedBuilder()
    .setColor('#f15b40')
    .setDescription('JinBot supports the following slash (/) commands:')
    .addFields(
        { name: '\u200B', value: "" },
    /*
        { name: '\u200B', value: "" },
        { name: '``', value: '', inline: true },
        { name: '``', value: '', inline: true },
        { name: '``', value: '', inline: true },
        { name: '``', value: '', inline: true },
        { name: '``', value: '', inline: true },
    */
    )
    .setFooter({ text:'JinBot • /help' })
    .setTimestamp();


	return interaction.reply({embeds: [embed], ephemeral: true}); //return it all to index for passing

	},//
    
};