const axios = require('axios').default;
const config = require('../config');
const { MessageEmbed } = require('discord.js');

const apiUrl = "https://discord.com/api/v6"


class DiscordClient {
  constructor() {
  }

    async getOwnerInfo() {
        const owner = await axios.get(`${apiUrl}/users/${config.owner.id}`, {
          headers: {
              'Authorization': `Bot ${config.owner.botToken}`,
          }
        })
        return owner.data;
    }


    async postContactMessage(name, email, subject, message) {
        const embed = new MessageEmbed()
        .setTitle(`New Contact Message from ${name}`)
        .setDescription(`**Name:** ${name}\n**Email:** ${email}\n**Subject:** ${subject}\n**Message:** ${message}`)
        .setColor("#00FF00")
        .setFooter(`Sent by ${name} | ${email}`)
        .setTimestamp();


        const channel = await axios.post(`${apiUrl}/webhooks/1009998800808575047/ULC7DdzOxsjR4XK6V5WB7M1ql5IyseRiZIELudFF48_xsgJi9Djj9K-tYs-FAQIV9Mvh`, {
            embeds: [embed],
            content: `New Contact Message from ${name}\n<@${config.owner.id}>`,
        })

        return channel.data;
    }



}

module.exports = DiscordClient;
