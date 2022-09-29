const axios = require('axios').default;


class Status {
  constructor(baseURL) {
    this.url = baseURL;
    this.status = axios.create({
        baseURL: `${this.url}/`,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'status': 'true'
        }
    })
  }

    async getStatus() {
        const homePage = await this.status.get("/");
        const redirectPage = await this.status.get("/redirect");
        
        return {
            homePage: homePage.status,
            redirectPage: redirectPage.status,
        }
    }


}

module.exports = Status;
