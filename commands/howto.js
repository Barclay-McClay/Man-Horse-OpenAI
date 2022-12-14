
const { SlashCommandBuilder, ActionRow } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const fs = require('node:fs');
//OpenAI
require('dotenv').config();
const got = require('got');

commandName='howto';

//tweaking
const stepsInput = 4;
const steps = stepsInput.toString();

async function AICall(howto) {
  const url = 'https://api.openai.com/v1/completions';//'https://api.openai.com/v1/engines/davinci/completions';
  const prompt = `This is how to ${howto} in ${steps} easy steps:\n`;
  console.log(prompt);
  const params = {
    "model": "text-curie-001",
    "prompt": prompt,
    "max_tokens": 150,
    "temperature": 0.2,
    "frequency_penalty": 0,
    'presence_penalty': 0.6,
    'stop': ((stepsInput+1).toString())+"."
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
  .setName(commandName)                                      //<----SET THE command name to be  the same as this file's name.js
  .setDescription(`JinBot breaks it down into ${steps} easy steps.`)                   //this is how discord will describe the command to the user
//,/*
  .addStringOption(option =>
    option.setName('do')
      .setDescription('This is how to <your text> *ie. tie your shoe*') 
      .setRequired(true)), //*/
  //-------------------------------------------------
  //----------------------------------------------------------------------------------------------------------------------
async execute(interaction) {//

  const howToInput = interaction.options.getString('do') ?? 'find gnosis';
  //const numberInput = interaction.options.getString('steps')
  const txt = await AICall(howToInput);//,numberInput);

  const embed = new EmbedBuilder()
  .setColor("#f15b40")
  .setTitle(`How to ${howToInput} in ${steps} easy steps:`)
  .setURL('https://github.com/Barclay-McClay/Man-Horse-OpenAI')
  .setAuthor({ name: 'JinBot' , iconURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/HAL9000.svg/256px-HAL9000.svg.png', url: 'https://github.com/Barclay-McClay/Man-Horse-OpenAI' })
  .setDescription(txt)
  .setFooter({ text:`JinBot • /${commandName}` })
  .setTimestamp();
   


return interaction.followUp({embeds: [embed]}); //return it all to index for passing

},//
  
};