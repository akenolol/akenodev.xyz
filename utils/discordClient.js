const axios = require('axios').default;
const config = require('../config');

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



}

module.exports = DiscordClient;
