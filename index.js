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
      switch (intent.slots.FeedName.value.toLowerCase()) {
        case "world":
        url = "http://feeds.bbci.co.uk/news/world/rss.xml?edition=uk";
        break;
        case "front page":
        case "uk":
        case "main":
        url = "http://feeds.bbci.co.uk/news/rss.xml?edition=uk";
        break;
        case "technology":
        case "tech":
        url = "http://feeds.bbci.co.uk/news/technology/rss.xml?edition=uk";
        break;
        case "local":
        case "northern ireland":
        url = "http://feeds.bbci.co.uk/news/northern_ireland/rss.xml?edition=uk";
        break;
        case "business":
        url = "http://feeds.bbci.co.uk/news/business/rss.xml?edition=uk";
        break;
        case "politics":
        url = "http://feeds.bbci.co.uk/news/politics/rss.xml?edition=uk";
        break;
        case "health":
        url = "http://feeds.bbci.co.uk/news/health/rss.xml?edition=uk";
        break;
        case "education":
        url = "http://feeds.bbci.co.uk/news/education/rss.xml?edition=uk";
        break;
        case "science":
        url = "http://feeds.bbci.co.uk/news/science_and_environment/rss.xml?edition=uk";
        break;
        case "entertainment":
        url = "http://feeds.bbci.co.uk/news/entertainment_and_arts/rss.xml?edition=uk";
        break;

        default:
        response.tellWithCard("Unable to understand " + intent.slots.FeedName.value, "RSS Headlines", "Couldn't understand " + intent.slots.FeedName.value);
        return;
      }
    }
    else
    {
      response.tellWithCard("Unable to understand that request", "RSS Headlines", "Couldn't understand the request");
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

      response.tellWithCard(ssmlOutput, "RSS Headlines", "Reading headlines from: " + parsed.feed.title);
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
