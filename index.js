const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const ejs = require("ejs");
const path = require("path");
const fs = require("fs");
const Logger = require("./utils/logger.js");
const logger = new Logger({ debug: true });
const os = require("os");
const Status = require("./utils/status.js");
const DiscordClient = require("./utils/discordClient.js");
const discordClient = new DiscordClient();
const config = require("./config");
const port = process.env.PORT || config.webApp.port;
const status = new Status(`${config.webApp.host}`);
const { Octokit } = require("@octokit/core");




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.engine(".ejs", ejs.__express);
app.use(express.static("public"));



app.get("/", async (req, res) => {
  discordClient.getOwnerInfo().then(async (owner) => {
    
    const octokit = new Octokit({
      auth: `${config.owner.githubToken}`,
    })

    const u = await octokit.request('GET /user', {})
    
    const userData = u.data;

    const projects = config.projects;
    

    const projectsArray = [];

    for (const project in projects) {
      projectsArray.push(projects[project]);
    }

    const companyReal = userData.company.replace("@", "");
    res.render("index", {
      owner: owner,
      projects: projectsArray,
      isHireable: userData.hireable,
      company: userData.company,
      companyReal: companyReal,
      location: userData.location,
      bio: userData.bio,
      twitter: userData.twitter_username,
      repos: userData.public_repos,
      followers: userData.followers,
    });
  })
})

app.get("/redirect", (req, res) => {
  const url = req.query.url;
  if (url == null || url == "" || url == undefined) {
    res.json({
      error: "No url provided"
    });
  } else {
    res.render("redirect", {
      REDIRECT_URL: url,
      REDIRECT_URL_SHORT: url
        .replace("https://", "")
        .replace("http://", "")
        .replace("www.", "")
        .split("/")[0],
      baseUrl: req.protocol + "://" + req.get("host"),
    });
    logger.log("Redirecting to " + url);
  }
});

app.get("/status", (req, res) => {
  status.getStatus().then((status) => {
    res.render("status", {
      homePage: status.homePage,
      redirectPage: status.redirectPage,
    });
  })
})




app.listen(port, () => {
  console.clear()

  const interfaces = os.networkInterfaces();
  const addresses = [];
  for (k in interfaces) {
    for (k2 in interfaces[k]) {
      const address = interfaces[k][k2];
      if (address.family === 'IPv4' && !address.internal) {
        addresses.push(address.address);
      }
    }
  }


  logger.info(`Server running at ${addresses}:${port}`);

})






