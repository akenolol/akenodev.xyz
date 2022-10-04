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

    async getUserInfo(id)
    {
        const user = await axios.get(`${apiUrl}/users/${id}`, {
          headers: {
              'Authorization': `Bot ${config.owner.botToken}`,
          }
        })
        return user.data;
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

    async postBugMessage(name, howToReproduce, expectedResult, actualResult) {
        const embed = new MessageEmbed()
        .setTitle(`New Bug Report from ${name}`)
        .setDescription(`**How to Reproduce:** ${howToReproduce}\n**Expected Result:** ${expectedResult}\n**Actual Result:** ${actualResult}`)
        .setColor("#FF0000")
        .setFooter(`Sent by ${name}`)
        .setTimestamp();


        const channel = await axios.post(`${apiUrl}/webhooks/1009998800808575047/ULC7DdzOxsjR4XK6V5WB7M1ql5IyseRiZIELudFF48_xsgJi9Djj9K-tYs-FAQIV9Mvh`, {
            embeds: [embed],
            content: `New Bug Report from ${name}\n<@${config.owner.id}>`,
        })

        return channel.data;
    }


    async getServerWidget(serverId, bannerStyle) {
        const styles = {
            shield: "shield",
            banner1: "banner1",
            banner2: "banner2",
            banner3: "banner3",
            banner4: "banner4"
        }

        
        if (styles[bannerStyle] == undefined) {
            throw new Error(`Banner Style not valid: ${bannerStyle}`)
        }
        else {
            return `https://discordapp.com/api/guilds/${serverId}/widget.png?style=${styles[bannerStyle]}`
        }
    }

    



}

module.exports = DiscordClient;
