
/**
 * Module dependencies.
 */

var express = require('express')
  , home = require('./routes/home')
  , http = require('http')
  , path = require('path');

var app = express();
var session = require('client-sessions');
app.use(session({

	  cookieName: 'session',
	  secret: 'cmpe273_test_string',
	  duration: 2 * 60 * 1000,
	  activeDuration: 5 * 60 * 1000,  }));
// all environments
app.set('port', process.env.PORT || 1121);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', home.index);
app.get('/signup', home.signup);
app.get('/signin',home.signin);
app.post('/login',home.login);
app.get('/homepage', home.twitterhome);
app.post('/addProfile',home.addUserProfile);
app.post('/addTweet',home.addTweet);
app.post('/trending',home.getTrends);
app.post('/searchName',home.searchName);
app.post('/profileDetails',home.getProfileDetails);
app.get('/profileView',home.profileView);
app.post('/follow',home.whotofollow);
app.post('/following',home.following);
app.post('/loadTweet',home.loadTweet);
app.post('/currentUser',home.currentUser);
app.post('/unfollow',home.unfollow);
app.post('/addRetweet',home.addRetweet);
app.post('/loadTweetProfile',home.loadTweetProfile);
app.post('/updateProfile',home.updateProfile);
app.post('/getProfile',home.userProfile);
app.post('/getFollowers',home.followers);
app.post('/search',home.search);
app.post('/getFollowing',home.getFollowing);
app.post('/logout',home.logout);
app.get('searchLookup',home.lookup);
app.post('/deleteTweet',home.deleteTweet)



app.get('/:name',home.userProfile);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
