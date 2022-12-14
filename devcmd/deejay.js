
const { SlashCommandBuilder, ActionRow } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const fs = require('node:fs');
//OpenAI
require('dotenv').config();
const got = require('got');

commandName='deejay'

async function AICall(prompt) {
    const url = 'https://api.openai.com/v1/completions';
    console.log(prompt);
    const params = {
        "model": "text-curie-001",
        "prompt": `I choose ${prompt} to pick the music today because`,
        "max_tokens": 80,
        "temperature": 0.9,
        "frequency_penalty": 0,
        'presence_penalty': 0,
        "stop": null
    };
    const headers = {
        'Authorization': `Bearer ${process.env.OPENAI_SECRET_KEY}`,
    };

    try {
        const response = await got.post(url, { json: params, headers: headers }).json();
        output = `${response.choices[0].text}`;
        console.log("JinBot: " + output);
        return output
    } catch (err) {
        console.log(err);
        return err
    }
};

module.exports = {
    //-------------------------------------------------
    data: new SlashCommandBuilder()
        .setName(commandName) //<----SET THE command name to be  the same as this file's name.js
        .setDescription('Pick an office DJ'), //this is how discord will describe the command to the user
    /*
    .addStringOption(option =>
      option.setName('prompt')
        .setDescription("JinBot will try and 'complete' your prompt...")
        .setRequired(true)), //*/
    //-------------------------------------------------
    //----------------------------------------------------------------------------------------------------------------------
    async execute(interaction) {//
        const promptInput = interaction.options.getString('prompt') ?? "HERE ARE THE BENEFITS OF WORKING IN COMPLETE SILENCE:";
        //const numberInput = interaction.options.getString('steps')
        const txt = await AICall(promptInput);//,numberInput);
        const embed = new EmbedBuilder()
            .setColor("#f7931e")
            .setTitle(promptInput + "...")
            .setURL('https://github.com/Barclay-McClay/Man-Horse-OpenAI')
            .setAuthor({ name: 'JinBot', iconURL: '../pfpThumb.png', url: 'https://github.com/Barclay-McClay/Man-Horse-OpenAI' })
            .setDescription("..." + txt)
            .setFooter({ text: `JinBot • /${commandName}` })
            .setTimestamp();
        return interaction.followUp({ embeds: [embed] }); //return it all to index for passing
    },//

};