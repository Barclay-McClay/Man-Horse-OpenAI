
const { SlashCommandBuilder, ActionRow } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const fs = require('node:fs');
//OpenAI
require('dotenv').config();
const got = require('got');

commandName='jinbot';

async function AICall(prompt) {
  const url = 'https://api.openai.com/v1/completions';
  console.log(prompt);
  const params = {
      "id":"chatcmpl-abc123",
      "object":"chat.completion",
      "created":1677858242,
      "model":"gpt-3.5-turbo",
      "usage":{
         "prompt_tokens":13,
         "completion_tokens":7,
         "total_tokens":20
      },
      "choices":[
         {
            "message":{
               "role":"assistant",
               "content":"\n\nThis is a test!"
            },
            "finish_reason":"stop",
            "index":0
         }
      ]
  };
  const headers = {
    'Authorization': `Bearer ${process.env.OPENAI_SECRET_KEY}`,
  };

  try {
    const response = await got.post(url, { json: params, headers: headers }).json();
    output = `${response.choices[0].text}`;
    console.log("JinBot: "+output);
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
  .setDescription('A completley open prompt for JinBot.') //this is how discord will describe the command to the user
//,/*
  .addStringOption(option =>
    option.setName('prompt')
      .setDescription("JinBot will try and 'complete' your prompt...")
      .setRequired(true)), //*/
  //-------------------------------------------------
  //----------------------------------------------------------------------------------------------------------------------
async execute(interaction) {//

  const promptInput = interaction.options.getString('prompt') ?? "What to do when JinBot becomes self-aware:";
  //const numberInput = interaction.options.getString('steps')
  const txt = await AICall(promptInput);//,numberInput);

  const embed = new EmbedBuilder()
  .setColor("#f7931e")
  .setTitle(promptInput+"...")
  .setURL('https://github.com/Barclay-McClay/Man-Horse-OpenAI')
  .setAuthor({ name: 'JinBot' , iconURL: 'https://raw.githubusercontent.com/Barclay-McClay/Man-Horse-OpenAI/main/pfpThumb.png', url: 'https://github.com/Barclay-McClay/Man-Horse-OpenAI' })
  .setDescription("..."+txt)
  .setFooter({ text:`JinBot • /${commandName}` })
  .setTimestamp();

return interaction.followUp({embeds: [embed]}); //return it all to index for passing

},//
  
};