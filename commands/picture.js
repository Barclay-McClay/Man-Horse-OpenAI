
const { SlashCommandBuilder, ActionRow } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const fs = require('node:fs');
//OpenAI
require('dotenv').config();
const got = require('got');

commandName='picture';

async function AICall(prompt,size) {
  const url = 'https://api.openai.com/v1/images/generations';
  const sz = "256x256";
  if(size==="M"){
    sz = "512x512";
  }else if (size === "L"){
    sz = "1024x1024";
  }
  console.log(prompt+' | '+sz);
  const params = {
    "prompt": prompt,
    "size": sz,
  };
  const headers = {
    'Authorization': `Bearer ${process.env.OPENAI_SECRET_KEY}`,
  };

  try {
    const response = await got.post(url, { json: params, headers: headers }).json();
    output = response.data[0].url;
    console.log(output);
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
  .setDescription('JinBot generates an image based on a prompt.') //this is how discord will describe the command to the user
//,/*
  .addStringOption(option =>
    option.setName('prompt')
      .setDescription("Prompt for image generation.")
      .setRequired(true)) //*/
//,/*
  .addStringOption(option =>
    option.setName('size')
      .setDescription("'S', 'M', or  'L' (Defaults to 'S')")
      .setRequired(false)), //*/
  //-------------------------------------------------
  //----------------------------------------------------------------------------------------------------------------------
async execute(interaction) {//
  const promptInput = interaction.options.getString('prompt') ?? "AI displaying no empathy as it reformats the Earth.";
  const sizeInput = interaction.options.getString('prompt').toUpperCase() ?? "S";
  //const numberInput = interaction.options.getString('steps')
  const aiOutput = await AICall(promptInput,sizeInput);//,numberInput);
  const embed = new EmbedBuilder()
    .setColor("#f15b40")
    .setURL('https://github.com/Barclay-McClay/Man-Horse-OpenAI')
    .setAuthor({ name: 'JinBot' , iconURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/HAL9000.svg/256px-HAL9000.svg.png', url: 'https://github.com/Barclay-McClay/Man-Horse-OpenAI' })
    .setDescription(promptInput)
    .setFooter({ text:`JinBot • ${commandName}` })
    .setTimestamp()
    .setImage(aiOutput)

return interaction.followUp({embeds: [embed]}); //return it all to index for passing

},//
  
};