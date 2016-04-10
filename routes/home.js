var mysql = require('./mysql');
var ejs =
	require("ejs");
const crypto = require('crypto');


exports.index = function(req, res){
	res.render('index', { title: 'Express' });
};

exports.signin = function(req, res){
	res.render('signin', { title: 'Express' });
};


exports.signup = function(req, res){
	res.render('signup', { title: '' });
};


exports.twitterhome = function(req, res){
	if(req.session.username)
		res.render('twitterhome', { title: 'My Home' });
	else
		res.render('index', { title: 'Express' });
};

exports.profileView = function(req, res){
	res.render('profile', { title: '' });
};

exports.login = function(req,res){
	var username = req.param("username");
	var password = req.param("password");
	console.log(username);
	const enPassword = crypto.pbkdf2Sync(password, "56S45D632A4N64", 100000, 64, 'sha256').toString('hex')
	var getUser="select * from PROFILE_TABLE where username='"+username+"' and password='" +enPassword +"'";
	console.log("Query is:"+getUser);
	mysql.fetchData(getUser,function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			console.log(results.length);
			if(results.length > 0){
				req.session.username = username;

				var user_id = results[0].USER_ID;
				var name = results[0].FULL_NAME;
				req.session.user_id = user_id;
				console.log(name);
				console.log(results);
				console.log(user_id);

				json_responses = {"statusCode" : true, "user_id" : user_id, "username" : username, "fullname" : name };
				res.send(json_responses);
			}
			else{
				console.log("Else code");
				json_responses = {"statusCode" : false};
				res.send(json_responses);
			}
		}	
	});
};

exports.addUserProfile = function(req,res){
	var username = req.param("username");
	var email = req.param("email");
	var password = req.param("password");
	var fullName = req.param("full_name");
	var phone = req.param("phone_no");
	var city = req.param("city");
	var joinedDate = new Date();
	var pwd;
	var user_idQ = "select user_id from profile_table where username = '"+username+"'";
	const enPassword = crypto.pbkdf2Sync(password, "56S45D632A4N64", 100000, 64, 'sha256').toString('hex')
	var addUser="insert into profile_table(username,password,email,full_name,phone,city,country,"+
	"profile_pic,cover_pic,description,website,theme_color,verified_acct) " +
	"values('"+username+"','"+enPassword+"','"+email+"','"+fullName+"','"+phone+"','"+city+"','','"+""+"','"+""+"','"+""+"','"+""+"','"+""+"','"+""+"');";

	mysql.insertData(addUser,function(err,results){

		if(err){
			if(err.message.includes("USERNAME_UNIQUE")){
				
				var json = {"status" : "duplicate"}
				console.log("--->"+err);
				res.send(json);
				
			}

		}
		else{
			console.log("Select user_id");
			
			mysql.fetchData(function(err,subResult){
				if(err){
					
				}
				else 
				{
					console.log("SubResult"+subResult.length);
					if(subResult.length > 0){
						console.log("SubResult_User_id"+subResult[0].user_id);
						var user_id_signup = subResult[0].user_id;
						req.session.user_id = user_id_signup;
						req.session.username = username;
						res.render('signup');
					}	
				}
			},user_idQ);
			
		}
	});
};

exports.addTweet = function(req,res){
	var user_id = req.session.user_id;
	var tweet = req.param("tweet");
	var hash=[];
	var hashtags = [];
	var hashIds = "";
	var hashes = "";
	console.log(tweet);
	var tweetSplit = tweet.split(" ");
	for(var index in tweetSplit){
		if(tweetSplit[index].startsWith("#")){
			//console.log(tweetSplit[index].slice(1));
			hashtags.push(tweetSplit[index]);
			hash.push(tweetSplit[index].slice(1));
		}
	}
	if(hash.length!=0){
		for(var i in hash){
			var duplicateEntry = false;

			var insertHash = "insert into hash_table (hash_name) values ('"+hash[i]+"')";
			mysql.insertData(insertHash,function(err,results){
				if(err){
					if(err.contains("DUPLICATE")){
						duplicateEntry =true;
					}
				}
				else 
				{
					console.log(results);
					if(results.affectedRows > 0)
						console.log("valid insertion of hash");
					else
						console.log("invalid insertion of hash");
				}
			});

			if(hashIds!="")
				hashIds = "#"+hash[i]+";"+hashIds;
			else
				hashIds = "#"+hash[i];
		}
	}
	console.log(hashIds);	
	console.log("Hash added");
	if(hashIds != "")
		var tweet = "insert into tweet_table(user_id,tweet_description,hash_tags) values ('"+user_id+"','"+tweet+"','"+hashIds+"')"
		else
			var tweet = "insert into tweet_table(user_id,tweet_description,hash_tags) values ('"+user_id+"','"+tweet+"',null)"
			mysql.insertData(tweet,function(err,results){

				if(err){
					console.log("errror in select hash id query");
				}
				else{
					console.log(results);
					if(results.affectedRows >0){
						console.log("tweet Successfull");
						res.send({"status" : 200});
					}
					else{
						console.log("tweet add else");
					}
				}

			});
}

exports.getTrends = function(req,res){
	if(req.session.username){
		console.log(req.session.username);
	}
	var trending = "select HASH_NAME from twitter.HASH_table order by TIME_STAMP DESC";
	mysql.fetchData(trending,function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			var json = [];
			if(results.length>0){
				for(i in results){
					json.push({"HASH_NAME": results[i].HASH_NAME});
				}

				console.log(json.length);
				res.send({"arr": json});
			}
		}
	});
}

exports.searchName = function(req,res){
	var search = req.param("search");
	console.log(search);
	var searchStr = "select username from profile_table where username like '"+search+"%';";
	mysql.fetchData(searchStr,function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			console.log(results);

			res.send(results);
		}
	});
}
exports.getProfileDetails = function(req,res){
	var username = req.session.username;
	var user_id = req.session.user_id;
	var following,follower;
	var details = "select username,user_id,full_name from profile_table where username = '"+username+"';";
	var getFollowing = "select count(following_id) as following from follow_table where user_id='"+user_id+"'"
	mysql.fetchData(getFollowing,function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			if(results.length>0){

				following = results[0].following;
				console.log("count following -->"+following);
			}
		}
	});

	var getFollowers = "select count(user_id) as follower from follow_table where following_id='"+user_id+"'"
	mysql.fetchData(getFollowers,function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			if(results.length>0){

				follower = results[0].follower;
				console.log("count -->"+follower);
			}
		}
	});
	mysql.fetchData(details,function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			if(results.length>0){

				var json = {"username" : results[0].username, 
						"user_ID" : req.session.user_id, 
						"fullname" : results[0].full_name,
						"following" : following,
						"follower" : follower};

			}
			res.send(json);
		}
	});
}

exports.whotofollow = function(req,res){
	var user_id;
	if(req.param("user_id")!=""){
		user_id = req.param("user_id");
	}
	else{
		user_id = req.session.user_id;
		console.log("inside else");
	}
	console.log("UserID"+user_id);
	var follow = "select user_id,full_name,username from PROFILE_TABLE where USER_ID not in " +
	"(select f.FOLLOWING_ID from profile_table p,FOLLOW_TABLE f " +
	"where p.user_id = '"+user_id+"' and p.user_id = f.user_id) and user_id != '"+user_id+"' LIMIT 3;"
	mysql.fetchData(follow,function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			if(results.length>0){
				console.log(results);
				var follow = results;
				for(i in follow){
					follow[i].showButton = true;
				}
				console.log(follow.length);
				res.send({"follow" : follow, "succescode" : true});
			}
		}
	});
}

exports.following = function(req,res){
	var user_id = req.session.user_id;
	console.log('Inside following function');
	var following_id = req.param("follow");
	console.log(user_id+"-->"+following_id);
	var addFollowing = "insert into follow_table (user_id,following_id) values('"+user_id+"','"+following_id+"');";
	mysql.insertData(addFollowing,function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			if(results.affectedRows>0){
				console.log('inserted successfully!!!');
				var json = {"succescode" : true}
				res.send(json);
			}
		}
	});
}

exports.loadTweet = function(req,res){
	var user_id = req.session.user_id;
	
	var tweet = "SELECT tab1.*, u.user_id, u.username, u.full_name FROM " +
	"(SELECT * FROM tweet_table t WHERE t.user_id = '" +user_id+ "'" +
	"OR t.user_id IN (SELECT following_id from follow_table f WHERE f.user_id = '" +user_id+ "')) tab1 " +
	"JOIN profile_table u WHERE tab1.user_id = u.user_id order by tweet_time desc ;";
	mysql.fetchData(tweet,function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			if(results.length>0){
				console.log("Tweets"+results.length);
				res.send({"res" : results});
			}
		}
	});
}

exports.userProfile = function(req,res){
	var username;
	var userprofile;
	var redirect = false;
	if(req.params.name)	{
		username = req.params.name;
		redirect = true;
		userprofile = "select user_id,username,full_name,city,email,phone,DATE_FORMAT(dob,'%M %d, %Y') as dob,DATE_FORMAT(joined_date,'%M %d, %Y') as joined_date from profile_table where username = '"+username+"';";
	}
	else
	{
		username = req.param("username");
		userprofile = "select user_id,username,full_name,city,email,phone,DATE_FORMAT(dob,'%m/%d/%Y') as dob,DATE_FORMAT(joined_date,'%m/%d/%Y') as joined_date from profile_table where username = '"+username+"';";
	}


	mysql.fetchData(userprofile,function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			if(results.length>0){
				console.log("From Profile --->"+results[0]);
				console.log("From Profile --->"+results[0].city);
				console.log("From Profile --->"+results[0].dob);
				console.log("From Profile --->"+results[0].email);
				var json = {"succescode" : true,
						"user_id" : results[0].user_id,
						"username" : results[0].username,
						"fullname" : results[0].full_name,
						"city" : results[0].city,
						"dob" : results[0].dob,
						"joinedon" : results[0].joined_date,
						"email" : results[0].email,
						"phone" : results[0].phone
				};
				if(redirect)
				{			
					console.log("From homepage -->")
					ejs.renderFile('./views/profile.ejs',json ,function(err, result) {
						// render on success
						if (!err) {
							res.end(result);
						}
						// render or error
						else {
							res.end('An error occurred');
							console.log(err);
						}
					});
				}
				else{

					res.send(json);
				}
			}
		}
	});
}

exports.unfollow = function(req,res) {
	var user_id = req.session.user_id;
	var following_id = req.param("unfollow");
	console.log(user_id+"-->"+following_id);
	var unfollow = "delete table follow_table where user_ID = '"+user_id+"' and following_id = '"+following_id+"';";
	mysql.deleteData(unfollow,function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			if(results.affectedRows>0){
				var json = {"succescode" : true}
				res.send(json);
			}
		}
	});
}

exports.addRetweet = function(req,res){
	var tweet = req.param("retweet");
	var comment = req.param("retweetComment");
	var retweet;
	if(comment != 'undefined'){
		retweet = "insert into retweet_tab (tweet_id,user_id,comments) values ('"+tweet.tweet_id+"','"+tweet.user_id+"','"+comment+"');"
	}
	else{
		retweet = "insert into retweet_tab (tweet_id,user_id,comments) values ('"+tweet.tweet_id+"','"+tweet.user_id+"','"+null+"');"
	}
	mysql.insertData(retweet,function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			if(results.affectedRows>0){
				var json = {"successcode" : true}
				res.send(json);
			}
		}
	});

}

exports.loadTweetProfile = function(req,res){
	var user_id = req.param("user_id");
	var tweetProfile = "select * from tweet_table t where t.tweet_id in " +
	"(select tweet_id from TWEET_TABLE t1 where t1.user_id='"+user_id+"' " +
	"UNION (select tweet_id from retweet_tab r where r.user_id = '"+user_id+"'));"
	mysql.fetchData(tweetProfile, function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			if(results.length>0){
				console.log("-->"+results);
				var json = {"successcode" : true,
						"tweets": results};
				res.send(json);
			}
		}
	});

}

exports.updateProfile = function(req,res){
	var user_id = req.param("user_id");
	var username = req.param("username");
	var city = req.param("city");
	var dob = req.param("dob");
	var phone = req.param("phone");

	var updateProfile = "update profile_table set phone = '"+phone+"',city = '"+city+"' where user_id='"+user_id+"';"

	mysql.updateData(updateProfile, function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			if(results.length>0){
				console.log("Updated"+results);
			}
		}
	});
}

exports.followers = function(req,res){
	var user_id = req.param("user_id");
	var follows = "select username,full_name,user_id from PROFILE_TABLE  where user_id in " +
	"(select user_id from FOLLOW_TABLE where following_id = '"+user_id+"');"
	mysql.fetchData(follows, function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			if(results.length>0){

				var json = {"results" : results};
				console.log("follows-->"+results);
				res.send(json);
			}
		}
	});
}

exports.getFollowing = function(req,res){
	var user_id = req.param("user_id");
	var follows = "select username,full_name,user_id from PROFILE_TABLE  where user_id in " +
	"(select following_id from FOLLOW_TABLE where user_id = '"+user_id+"');"
	mysql.fetchData(follows, function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			if(results.length>0){
				var following = results;
				for(i in following){
					following[i].hideFollowing = false;
				}
				console.log(following[0].hideFollowing);
				var json = {"results" : following};
				console.log("following-->"+results);
				res.send(json);
			}
		}
	});
}

exports.search = function(req,res){
	var word = req.param("keyword");
	var search = "select t.tweet_id,t.tweet_description, p.username,p.full_name,hash_tags from TWEET_TABLE t,PROFILE_TABLE p where t.user_id = p.user_id " +
	"and hash_tags like '%"+word+"%';"
	console.log("SearchEngine "+search);
	mysql.fetchData(search, function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			if(results.length>0){
				var json = {"results" : results};
				console.log("Search4543--->"+results.length);
				res.send(json);

			}
			else{

			}
		}
	});
}

exports.lookup = function(req,res){
	console.log("username invalid");
	res.render('signup', { title: '' });
}
exports.currentUser = function(req,res){
	console.log("in node");
	var user_id = req.session.user_id;
	var username = req.session.username;

	var json = {
			"currUserId" : user_id,
			"currUsername" : username
	};

	res.send(json);
}

exports.logout = function(req,res){
	req.session.destroy();
	var json = {"status" : true};
	console.log("Logging out...");
	res.send(json);
}

exports.deleteTweet = function(req,res){
	var user_id = req.session.user_id;
	var tweet = req.param("tweet");
	console.log("Deletion");
	console.log("Tweet Deletion"+tweet.TWEET_ID);
	var deleteQ = "delete from tweet_table where tweet_id = '"+tweet.TWEET_ID+"' and user_id = '"+tweet.user_id+"';"
	mysql.deleteData(deleteQ, function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			if(results.length>0){
				var json = {"statusCode" : true};
			}
			else{

			}
		}
	});
}

