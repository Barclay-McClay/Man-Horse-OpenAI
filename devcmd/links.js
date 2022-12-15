const { SlashCommandBuilder, ActionRow } = require('@discordjs/builders');
const { EmbedBuilder, MessageActionRow, MessageSelectMenu, MessageButton } = require('discord.js');
const fs = require('node:fs');

commandName='links';

module.exports = {

    //-------------------------------------------------
    data: new SlashCommandBuilder()
        .setName(commandName)                                      //<----SET THE command name to be  the same as this file's name.js
        .setDescription('Get JinBot help. Get started.'),                   //this is how discord will describe the command to the user

    //-------------------------------------------------
    //----------------------------------------------------------------------------------------------------------------------
    async execute(interaction) {//

        const embed = new EmbedBuilder()
            .setColor('#f7931e')
            .setTitle("**/Links**")
            .setURL('https://github.com/Barclay-McClay/Man-Horse-OpenAI')
            .setAuthor({ name: 'JinBot', iconURL: 'https://raw.githubusercontent.com/Barclay-McClay/Man-Horse-OpenAI/main/pfpThumb.png', url: 'https://github.com/Barclay-McClay/Man-Horse-OpenAI' })
            .addFields(
                { name: 'AAD', value: 'https://portal.azure.com/#home', inline: true },
                { name: 'M365 Admin', value: 'https://admin.microsoft.com/#/homepage', inline: true },
            )
            .setFooter({ text: `JinBot • /${commandName}` })
            .setTimestamp();


        return interaction.reply({ embeds: [embed], ephemeral: true }); //return it all to index for passing

    },//

};