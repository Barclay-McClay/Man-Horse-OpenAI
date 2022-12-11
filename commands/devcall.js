
const { SlashCommandBuilder, ActionRow } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const fs = require('node:fs');
//OpenAI
require('dotenv').config();
const got = require('got');

// This is just an example, but could be something you keep track of
// in your application to provide OpenAI as prompt text.
const chatLog = `Jinbot is a clever, irreverent AI servant whose responses are unprofessional, but still helpful.\n`;
// The new question asked by the user.

async function AICall(input) {
  console.log(input);
  const url = 'https://api.openai.com/v1/engines/davinci/completions';
  const prompt = `${chatLog}Human: ${input}\nJinbot:`;
  const params = {
    'prompt': prompt,
    'max_tokens': 150,
    'temperature': 0.9,
    'frequency_penalty': 0,
    'presence_penalty': 0.6,
    'stop': '\nHuman'
  };
  const headers = {
    'Authorization': `Bearer ${process.env.OPENAI_SECRET_KEY}`,
  };

  try {
    const response = await got.post(url, { json: params, headers: headers }).json();
    output = `${response.choices[0].text}`;
    console.log("Jinbot: "+output);
    return output
  } catch (err) {
    console.log(err);
    return err
  }
};

module.exports = {

  //-------------------------------------------------
data: new SlashCommandBuilder()
  .setName('devcall')                                      //<----SET THE command name to be  the same as this file's name.js
  .setDescription('For testing purposes')                   //this is how discord will describe the command to the user
//,/*
  .addStringOption(option =>
    option.setName('input')
      .setDescription('What do you want to say to Jinbot?')  //<----SET THE DESCRIPTION (How is the book divided?)
      .setRequired(true)), //*/
  //-------------------------------------------------
  //----------------------------------------------------------------------------------------------------------------------
async execute(interaction) {//

  const humanInput = interaction.options.getString('input')
  const txt = await AICall(humanInput);

  const embed =  new EmbedBuilder()
  .setColor('#f15b40')
  .setAuthor(humanInput)
  .setDescription(txt)
  .setFooter({ text:'JinBot • /devcall' })
  .setTimestamp();


return interaction.reply({embeds: [embed], ephemeral: true}); //return it all to index for passing

},//
  
};