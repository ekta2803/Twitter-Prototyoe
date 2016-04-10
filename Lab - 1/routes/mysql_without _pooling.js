var ejs= require('ejs');
var mysql = require('mysql');

//Put your mysql configuration settings - user, password, database and port
function getConnection(){
	var connection = mysql.createConnection({
	    host     : 'localhost',
	    user     : 'root',
	    password : 'Mysql2803',
	    database : 'Twitter',
	    port	 : 3306
	});
	return connection;
}
var pool = mysql.createPool({
	connectionLimit: 1000,
	 host     : 'localhost',
	 user     : 'root',
	 password : 'Mysql2803',
	 database : 'Twitter',
	 port	 : 3306,
	debug : false
	
});


-----------------------------------------

function fetchData(callback,sqlQuery){
	
	console.log("\nSQL Query::"+sqlQuery);
	
	var connection=getConnection();
	
	connection.query(sqlQuery, function(err, rows, fields) {
		if(err){
			console.log("ERROR: " + err.message);
		}
		else 
		{	// return err or result
			console.log("DB Results:"+rows);
			callback(err, rows);
		}
	});
	console.log("\nConnection closed..");
	connection.end();
}	

function insertData(callback,sqlQuery){
	
	console.log("\nSQL Query::"+sqlQuery);
	
	var connection=getConnection();
	
	connection.query(sqlQuery, function(err, rows, fields) {
		if(err){
			console.log("ERROR: " + err.message);
		}
		else 
		{	// return err or result
			console.log("DB Results:"+rows);
			callback(err, rows);
		}
	});
	console.log("\nConnection closed..");
	connection.end();
}	

function updateData(callback,sqlQuery){
	
	console.log("\nSQL Query::"+sqlQuery);
	
	var connection=getConnection();
	
	connection.query(sqlQuery, function(err, rows, fields) {
		if(err){
			console.log("ERROR: " + err.message);
		}
		else 
		{	// return err or result
			console.log("DB Results:"+rows);
			callback(err, rows);
		}
	});
	console.log("\nConnection closed..");
	connection.end();
}	


function deleteData(callback,sqlQuery){
	
	console.log("\nSQL Query::"+sqlQuery);
	
	var connection=getConnection();
	
	connection.query(sqlQuery, function(err, rows, fields) {
		if(err){
			console.log("ERROR: " + err.message);
		}
		else 
		{	// return err or result
			console.log("DB Results:"+rows);
			callback(err, rows);
		}
	});
	console.log("\nConnection closed..");
	connection.end();
}	

----------------------------------------
function fetchData(callback,sqlQuery){
	pool.getConnection(function(err,connection){
		if(err){
			connection.release;
			return;
			
		}
		connection.query(sqlQuery, function(err, rows, fields) {
			if(err){
			console.log("ERROR: " + err.message);
		}
			else 
		{	
			console.log("DB Results:"+rows);
			callback(err, rows);
			connection.release;
		}
		
	});
});
}

//function fetchData(callback,sqlQuery){
//	
//	console.log("\nSQL Query::"+sqlQuery);
//	
//	var connection=getConnection();
//	
//	connection.query(sqlQuery, function(err, rows, fields) {
//		if(err){
//			console.log("ERROR: " + err.message);
//		}
//		else 
//		{	// return err or result
//			console.log("DB Results:"+rows);
//			callback(err, rows);
//		}
//	});
//	console.log("\nConnection closed..");
//	connection.end();
//}	

function insertData(sqlQuery,callback){
console.log("\nSQL Query::"+sqlQuery);
	
pool.getConnection(function(err,connection){
	if(err){
		connection.release;
		return;
		
	}
	connection.query(sqlQuery, function(err, rows, fields) {
		if(err){
			
			callback(err,rows);
		}
		else 
		{	// return err or result
			console.log("insertData -- DB Results:"+rows);
			callback(err, rows);
			connection.release;
		}
	});
});
}


function updateData(sqlQuery,callback){
	console.log("\nSQL Query::"+sqlQuery);
		
	pool.getConnection(function(err,connection){
		if(err){
			connection.release;
			return;
			
		}
		
		connection.query(sqlQuery, function(err, rows, fields) {
			if(err){
				console.log("updateData -- ERROR: " + err.message);
			}
			else 
			{	// return err or result
				console.log("updateData -- DB Results:"+rows);
				callback(err, rows);
				connection.release;
			}
		});
	});
}

function insertHashQuery(sqlQuery,callback){
	console.log("\nSQL Query::"+sqlQuery);
	pool.getConnection(function(err,connection){
		if(err){
			connection.release;
			return;
			
		}
	
	connection.query(sqlQuery, function(err, rows, fields) {
		if(err){
			if(err.toString().search("DUPLICATE")==-1){
				console.log("Duplicate entry");
			}
		}
		else 
		{	// return err or result
			console.log("updateData -- DB Results:"+rows);
			callback(err, rows);
			connection.release;
		}
	});
});
}

function getHashID(sqlQuery,callback){
	console.log("\nSQL Query::"+sqlQuery);
	pool.getConnection(function(err,connection){
		if(err){
			connection.release;
			return;
			
		}
	var hashId="";
	connection.query(sqlQuery, function(err, rows, fields) {
		if(err){
			if(err.contains("DUPLICATE")){
				console.log("Duplicate entry");
			}
		}
		else 
		{	// return err or result
			 
			callback(err,rows);
			connection.release;
		}
	});
});
}

function addTweets(sqlQuery,callback){
	console.log("\nSQL Query::"+sql);
		
		pool.getConnection(function(err,connection){
			if(err){
				connection.release;
				return;
				
			}
	connection.query(sqlQuery, function(err, rows, fields) {
		if(err){
			
				console.log("Tweet : error"+err);
			
		}
		else 
		{	// return err or result
			console.log("Tweet -- DB Results:"+rows);
			callback(err, rows);
			connection.release;
		}
	});
});
}

function getTrends(sqlQuery,callback){
	console.log("\nSQL Query::"+sqlQuery);
	pool.getConnection(function(err,connection){
		if(err){
			connection.release;
			return;
			
		}
	
	connection.query(sqlQuery, function(err, rows, fields) {
		if(err){
			
				console.log("Trending : error"+err);
			
		}
		else 
		{	// return err or result
			console.log("Trending -- DB Results:"+rows);
			callback(err, rows);
			connection.release;
		}
	});
});
}

function searchQuery(sqlQuery,callback){
	console.log("Sql Query: "+sqlQuery);
	pool.getConnection(function(err,connection){
		if(err){
			connection.release;
			return;
			
		}
		connection.query(sqlQuery, function(err, rows, fields) {
			if(err){
			console.log("ERROR: " + err.message);
		}
			else 
		{	
			console.log("DB Results:"+rows);
			callback(err, rows);
			connection.release;
		}
		
	});
});
}

function getUserDetails(sqlQuery,callback){
	console.log("Get User details Sql Query: "+sqlQuery);
	pool.getConnection(function(err,connection){
		if(err){
			connection.release;
			return;
			
		}
		connection.query(sqlQuery, function(err, rows, fields) {
			if(err){
			console.log("ERROR: " + err.message);
		}
			else 
		{	
			console.log("DB Results:"+rows);
			callback(err, rows);
			connection.release;
		}
		
	});
});
}

function getWhoToFollow(sqlQuery,callback){
	console.log("Sql Query: "+sqlQuery);
	pool.getConnection(function(err,connection){
		if(err){
			connection.release;
			return;
			
		}
		connection.query(sqlQuery, function(err, rows, fields) {
			if(err){
			console.log("ERROR: " + err.message);
		}
			else 
		{	
			console.log("DB Results:"+rows);
			callback(err, rows);
			connection.release;
		}
		
	});
});
}
function insertFollowing(sqlQuery,callback){
	console.log("Sql Query: "+sqlQuery);
	pool.getConnection(function(err,connection){
		if(err){
			connection.release;
			return;
			
		}
		connection.query(sqlQuery, function(err, rows, fields) {
			if(err){
			console.log("ERROR: " + err.message);
		}
			else 
		{	
			console.log("DB Results:"+rows);
			callback(err, rows);
			connection.release;
		}
		
	});
});
}

function loadTweets(sqlQuery,callback){
	
	pool.getConnection(function(err,connection){
		if(err){
			connection.release;
			return;
			
		}
		connection.query(sqlQuery, function(err, rows, fields) {
			if(err){
			console.log("ERROR: " + err.message);
		}
			else 
		{	
			
			callback(err, rows);
			connection.release;
		}
		
	});
});
}

function unfollow(sqlQuery,callback){
	console.log("Sql Query: "+sqlQuery);
	pool.getConnection(function(err,connection){
		if(err){
			connection.release;
			return;
			
		}
		connection.query(sqlQuery, function(err, rows, fields) {
			if(err){
			console.log("ERROR:unfollow: " + err.message);
		}
			else 
		{	
			console.log("unfollow Results:"+rows);
			callback(err, rows);
		}
		
	});
});
}

function getFollowing(sqlQuery,callback){
	console.log("Sql Query: "+sqlQuery);
	pool.getConnection(function(err,connection){
		if(err){
			connection.release;
			return;
			
		}
		connection.query(sqlQuery, function(err, rows, fields) {
			if(err){
			console.log("ERROR:following: " + err.message);
		}
			else 
		{	
			console.log("following Results:"+rows);
			callback(err, rows);
		}
		
	});
});
}

function getFollowers(sqlQuery,callback){
	console.log("Sql Query: "+sqlQuery);
	pool.getConnection(function(err,connection){
		if(err){
			connection.release;
			return;
			
		}
		connection.query(sqlQuery, function(err, rows, fields) {
			if(err){
			console.log("ERROR:follwers: " + err.message);
		}
			else 
		{	
			console.log("followers Results:"+rows);
			callback(err, rows);
		}
		
	});
});
}

function addRetweet(sqlQuery,callback){
	console.log("Sql Query: "+sqlQuery);
	pool.getConnection(function(err,connection){
		if(err){
			connection.release;
			return;
			
		}
		connection.query(sqlQuery, function(err, rows, fields) {
			if(err){
			console.log("ERROR:retweet: " + err.message);
		}
			else 
		{	
			console.log("retweet Results:"+rows);
			callback(err, rows);
		}
		
	});
});
}

function userProfile (sqlQuery,callback){
	console.log("Sql Query: "+sqlQuery);
	pool.getConnection(function(err,connection){
		if(err){
			connection.release;
			return;
			
		}
		connection.query(sqlQuery, function(err, rows, fields) {
			if(err){
			console.log("profile " + err.message);
		}
			else 
		{	
			console.log("profile:"+rows);
			callback(err, rows);
		}
		
	});
});
	
}

function updateProfile (sqlQuery,callback){
	console.log("Sql Query: "+sqlQuery);
	pool.getConnection(function(err,connection){
		if(err){
			connection.release;
			return;
			
		}
		connection.query(sqlQuery, function(err, rows, fields) {
			if(err){
			console.log("profile " + err.message);
		}
			else 
		{	
			console.log("profile:"+rows);
			callback(err, rows);
		}
		
	});
});
	
}

function deleteTweet(sqlQuery,callback){
	console.log("Sql Query: "+sqlQuery);
	pool.getConnection(function(err,connection){
		if(err){
			connection.release;
			return;
			
		}
		connection.query(sqlQuery, function(err, rows, fields) {
			if(err){
			console.log("profile " + err.message);
		}
			else 
		{	
			console.log("profile:"+rows);
			callback(err, rows);
		}
		
		});
	});
		
	}

exports.deleteTweet=deleteTweet;
exports.updateProfile=updateProfile;
exports.userProfile=userProfile;
exports.addRetweet=addRetweet;
exports.getFollowers=getFollowers;
exports.getFollowing=getFollowing;
exports.unfollow=unfollow;
exports.insertFollowing=insertFollowing;
exports.getWhoToFollow = getWhoToFollow;
exports.getUserDetails=getUserDetails;
exports.searchQuery=searchQuery;
exports.getTrends=getTrends;
exports.fetchData=fetchData;
exports.insertData=insertData;
exports.updateData=updateData;
exports.insertHashQuery=insertHashQuery;
exports.getHashID=getHashID;
exports.addTweets=addTweets;
exports.loadTweets = loadTweets;