/**
* App ID for the skill
*/
var APP_ID = "YOUR_ALEXA_SKILL_ID_HERE";

var AlexaSkill = require('./AlexaSkill');
var parser = require('rss-parser');

var RssReader = function () {
  AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
RssReader.prototype = Object.create(AlexaSkill.prototype);
RssReader.prototype.constructor = RssReader;

RssReader.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
  console.log("RssReader onSessionStarted requestId: " + sessionStartedRequest.requestId
  + ", sessionId: " + session.sessionId);
  // any initialization logic goes here
};

RssReader.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
  console.log("RssReader onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
  var speechOutput = "Welcome, What news would you like to hear?";
  var repromptText = "What news would you like to hear?";
  response.ask(speechOutput, repromptText);
};

RssReader.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
  console.log("RssReader onSessionEnded requestId: " + sessionEndedRequest.requestId
  + ", sessionId: " + session.sessionId);
  // any cleanup logic goes here
};

RssReader.prototype.intentHandlers = {
  // register custom intent handlers
  "GetBBCNews": function (intent, session, response) {
    var url;
    if(intent.slots && intent.slots.FeedName)
    {
      switch (intent.slots.FeedName.value) {
        case "world":
        url = "http://feeds.bbci.co.uk/news/world/rss.xml?edition=uk";
        break;
        case "front page":
        url = "http://feeds.bbci.co.uk/news/rss.xml?edition=uk";
        break;
        case "technology":
        url = "http://feeds.bbci.co.uk/news/technology/rss.xml?edition=uk";
        break;
        case "local":
        url = "http://feeds.bbci.co.uk/news/northern_ireland/rss.xml?edition=uk";
        break;
        default:
        response.tellWithCard("Unable to understand " + intent.slots.FeedName.value, "BBC News RSS Reader", "BBC News RSS Reader");
        return;
      }
    }
    else
    {
      response.tellWithCard("Unable to understand that request", "BBC News RSS Reader", "BBC News RSS Reader");
      return;
    }

    parser.parseURL(url, function(err,parsed){

      var output = "" + parsed.feed.title + ". <break time=\"0.8s\"/> ";

      var i = 0;
      parsed.feed.entries.forEach(function(entry){
        if(i <= 4)
        {
          console.log(entry.title);
          output = output + entry.title + ". <break time=\"0.6s\"/> "
          i++;
        }
      })

      var ssmlOutput = {
        speech: '<speak>' + output + '</speak>',
        type: AlexaSkill.speechOutputType.SSML
      };

      response.tellWithCard(ssmlOutput, "BBC News RSS Reader", "BBC News RSS Reader");
    });

  },
  "AMAZON.HelpIntent": function (intent, session, response) {
    response.ask("You can say what feed you want to hear", "You can say what feed you want to hear");
  }
};

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
  // Create an instance of the RssReader skill.
  var rssReader = new RssReader();
  rssReader.execute(event, context);
};
