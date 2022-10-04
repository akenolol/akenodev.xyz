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
const githubClient = require('./utils/githubClient');
const github = new githubClient();




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.engine(".ejs", ejs.__express);
app.use(express.static("public"));



app.get("/", async (req, res) => {
  discordClient.getOwnerInfo().then(async (owner) => {
  
    const projectsArray = [];
    const codingLanguagesArray = [];
    const frameworksArray = [];
    const issuesArray = [];
    const pullRequestsArray = [];

    const projects = config.projects;
    const socials = config.profile.socials;
    const codingLanguages = config.languages;
    const frameworks = config.frameworks;
    const issues = await github.getIssues();
    const pullRequests = await github.getPullRequests();
    
    const octokit = new Octokit({
      auth: `${config.owner.githubToken}`,
    })

    const u = await octokit.request('GET /user', {})
    
    const userData = u.data;


    

    issues.forEach((issue) => {
      issuesArray.push(issue);
    })

    pullRequests.forEach((pullRequest) => {
      pullRequestsArray.push(pullRequest);
    })

    


    

    for (const project in projects) {
      projectsArray.push(projects[project]);
    }



    for (const language in codingLanguages) {
      codingLanguagesArray.push(codingLanguages[language]);
    }

    for (const framework in frameworks) {
      frameworksArray.push(frameworks[framework]);
    }
    

    const companyReal = userData.company.replace("@", "");
    res.render("index", {
      owner: owner,
      supportServer: config.owner.supportServer,
      projects: projectsArray,
      currentIssues: issuesArray,
      currentPullRequests: pullRequestsArray,
      codingLanguages: codingLanguagesArray,
      aboutMe: config.profile.aboutMe,
      languages: config.profile.languages,
      socials: socials,
      isHireable: userData.hireable,
      company: userData.company,
      companyReal: companyReal,
      location: userData.location,
      bio: userData.bio,
      twitter: userData.twitter_username,
      repos: userData.public_repos,
      followers: userData.followers,
      frameworks: frameworksArray,
    });
  })
})

app.get("/error", (req, res) => {
  const error = req.query.err;
  const code = req.query.code;
  if (error == null || error == "" || error == undefined) {
    res.json({
      error: "No error provided"
    });
  }
  else {
    res.render("error.ejs", {
      error: error,
      code: code,
    })
  }
})

app.post("/contact", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const subject = req.body.subject;
  const message = req.body.text;

  discordClient.postContactMessage(name, email, subject, message).then((channel) => {
    res.json({
      success: "Message sent successfully",
      message: channel,
    })
  })  
})

app.post("/bug", (req, res) => {
  const name = req.body.name;
  const expectedResult = req.body.expectedResult;
  const actualResult = req.body.actualResult;
  const howToReproduce = req.body.howToReproduce;

  discordClient.postBugMessage(name, expectedResult, actualResult, howToReproduce).then((channel) => {
    res.json({
      success: "Bug sent successfully",
      message: "If you are in the support server, please DM akeno#1010, and we will get back to you as soon as possible.",
    })
  })
})

app.get("/reportbug", async (req, res) => {
  res.render("reportBug.ejs", {

  });
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
      HOST: req.hostname,
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






