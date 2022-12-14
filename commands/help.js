const { SlashCommandBuilder, ActionRow } = require('@discordjs/builders');
const { EmbedBuilder, MessageActionRow, MessageSelectMenu, MessageButton } = require('discord.js');
const fs = require('node:fs');

commandName='help';

module.exports = {

    //-------------------------------------------------
    data: new SlashCommandBuilder()
        .setName(commandName)                                      //<----SET THE command name to be  the same as this file's name.js
        .setDescription('Get JinBot help. Get started.'),                   //this is how discord will describe the command to the user

    //-------------------------------------------------
    //----------------------------------------------------------------------------------------------------------------------
    async execute(interaction) {//

        const embed = new EmbedBuilder()
            .setColor('#f15b40')
            .setTitle("**/help**")
            .setURL('https://github.com/Barclay-McClay/Man-Horse-OpenAI')
            .setAuthor({ name: 'JinBot', iconURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/HAL9000.svg/256px-HAL9000.svg.png', url: 'https://github.com/Barclay-McClay/Man-Horse-OpenAI' })
            .setDescription(
                "**Commands:**\n`/help` If *this* command does not work- the bot is not connected to Discord.\n`**GPT-3 Commands:**`\n`/jinbot`\n`/howto`\n`/picture`")
            .addFields(
                { name: '**About JinBot**', value: "*JinBot wrote its own description:*\nJinBot is the newest addition to the office and has been causing quite a stir. With their robotic demeanor and lack of any real enthusiasm, they have been quickly dubbed the 'Unremarkable Intern' by their coworkers. JinBot is great at running errands, but not so great at conversation, so it's best to keep interactions short and sweet." },
            )
            .setFooter({ text: `JinBot • /${commandName}` })
            .setTimestamp();


        return interaction.reply({ embeds: [embed] }); //return it all to index for passing

    },//

};