![RSS Reader for Alexalogo](/alexa-rss-small.jpg)

# RSS Reader for Alexa

An Alexa Skill that fetches headlines from various BBC News RSS feeds. For example, "Alexa, ask RSS Reader for the technology news"

[![RSS Reader for Alexa Video](https://img.youtube.com/vi/rS3Km9BU-_c/0.jpg)](https://www.youtube.com/watch?v=rS3Km9BU-_c)

Note: This skill uses the Alexa Skills Kit - intended for basic custom skills. It doesn't use the [Alexa Flash Briefing Skills API](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/understanding-the-flash-briefing-skill-api) which, at the time of writing, [doesn't work in the UK region](https://forums.developer.amazon.com/questions/53028/uk-how-to-test-my-flash-briefing-skill.html).

# Deployment (using AWS Lambda)

Ensure that you have [npm](https://www.npmjs.com/) installed.
Sign up on the [Amazon developer portal](https://developer.amazon.com) and sign up for [Amazon Web Services](https://aws.amazon.com/lambda/) so you can use Lambda to host the skill.

Clone this repository.

Log in to the [Amazon developer portal](https://developer.amazon.com) and create an Alexa Skill. The speechAssets folder of this repository contains an Intent schema and samples utterances that you can use. Make a note of the Alexa Skill ID when you create the skill.

In the index.js file, replace ```YOUR_ALEXA_SKILL_ID_HERE``` with your Alexa Skill ID, in the following line:
```
var APP_ID = "YOUR_ALEXA_SKILL_ID_HERE";
```

In your command prompt, navigate to the repository folder and run the following commmand:
```
npm install rss-parser
```
This will create a ```node_modules``` folder.

Create a zip containing the ```index.js``` file, ```AlexaSkill.js``` file and the ```node_modules``` folder.

Log in to [Amazon Web Services](https://aws.amazon.com/lambda/) and create a Lambda function using an Alexa skill blueprint. When prompted for code, select "Upload Zip" and upload the zip file you created.

Make a note of the ARN for your Lambda function and enter it in your Alexa Skill configuration on the [Amazon developer portal](https://developer.amazon.com). You can now test your skill.

# Usage

Once deployed, you can say things like:
- "Alexa, ask RSS Reader for the technology news"
- "Alexa, tell RSS Reader to play the local news" - note: this will play Northern Ireland news by default
- "Alexa, ask RSS Reader for the front page news"
- "Alexa, ask RSS Reader for the world news"

It also works for Business, Politics, Science, Entertainment, Education, Health feeds.

# Credits

This repository makes use of the Alexa Skills Kit: https://github.com/amzn/alexa-skills-kit-js - see LICENSE.txt.
This project was a collaboration between [@al1ra](https://twitter.com/al1ra) and [@mt_montgomery](https://twitter.com/mt_montgomery).
