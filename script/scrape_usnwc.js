var Twitter = require('twitter');

var constants = require('../constants');
var models = require('../db/models');

var client = new Twitter({
  consumer_key: constants.twitter_consumer_key,
  consumer_secret: constants.twitter_consumer_secret,
  access_token_key: constants.twitter_access_token_key,
  access_token_secret: constants.twitter_access_token_secret
});
 
var params = {
  screen_name: 'usnwctrails',
  count: 1,
  include_rts: false,
  exclude_replies: true
};

client.get('statuses/user_timeline', params, function(error, tweets, response){
  if (error) {
    throw error;
  }
  if (!(tweets && tweets.length > 0)) {
    console.log('No tweets found. Returned data was: ', JSON.stringify(tweets));
    return;
  }

  var tweet = tweets[0];
  var openOrClosed;

  if (tweet.text.indexOf('are open') > -1) {
    openOrClosed = 'open';
  } else if (tweet.text.indexOf('are closed') > -1) {
    openOrClosed = 'closed';
  }

  if (!openOrClosed) {
    console.log('Tweet text did not contain "open" or "closed". Doing nothing. Text was: ', tweet.text);
    return;
  }

  models.Trail.find(11)
    .then(function (trail) {
      var status_date = new Date(tweet.created_at);

      if (trail.status !== openOrClosed) {
        trail.status_date = status_date;
        trail.status = openOrClosed;
        trail.save();
      }
    })
    .catch(function (error) {
      console.log('Error finding USNWC trail: ', error);
    });
});
