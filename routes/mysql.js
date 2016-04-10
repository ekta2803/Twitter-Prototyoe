
var ejs= require('ejs');
var mysql = require('mysql');
var pool = [],poolStatus = [];
var CONNECTION_OPEN = 0, CONNECTION_BUSY = 1;
var minimumPoolSize = 10, maximumPoolSize = 25;
// without connection pooling
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
// for connection pooling
function createConnection()
{
    var connection = mysql.createConnection({
    	host     : 'localhost',
	    user     : 'root',
	    password : 'Mysql2803',
	    database : 'Twitter',
	    port	 : 3306
    });
    return connection;
}

function Pool()
{
    for(var i=0; i < minimumPoolSize; ++i)
    {
        pool.push(createConnection());
        poolStatus.push(CONNECTION_OPEN);
    }
}

function addConnectionToPool()
{
    pool.push(createConnection());
    poolStatus.push(CONNECTION_OPEN);
}

Pool.prototype.getConnection = function()
{
    var poolExausted = true;
    var poolJSON;
    for(var j = 0 ; j < pool.length ; j++)
    {
        if(poolStatus[j] === CONNECTION_OPEN)
        {
            poolStatus[j] = CONNECTION_BUSY;
            poolExausted = false;
            poolJSON = [{poolObject: pool[j],poolObjectLocation: j}];
            return poolJSON;
        }
    }

    if(poolExausted && pool.length < maximumPoolSize)
    {
        addConnectionToPool();
        poolStatus[pool.length-1] = CONNECTION_BUSY;
        poolExausted = false;
        poolJSON = [{poolObject: pool[pool.length-1],poolObjectLocation: jCount}];
        return poolJSON;
    }
};

Pool.prototype.releaseConnection = function(connectionObjectLocation)
{
    if(poolStatus[connectionObjectLocation] === CONNECTION_BUSY)
    {
        poolStatus[connectionObjectLocation] = CONNECTION_OPEN;
    }
};

var p = new Pool();

//function fetchData(sqlQuery,callback){
//
//    console.log("\nSQL Query::"+sqlQuery);
//
//    var connectionFromPool = p.getConnection();
//    var connection = connectionFromPool[0].poolObject;
//    var connectionLocation = connectionFromPool[0].poolObjectLocation;
//
//    connection.query(sqlQuery, function(err, rows, fields) {
//        if(err){
//            console.log("ERROR: " + err.message);
//        }
//        else 
//        {    // return err or result
//            console.log("DB Results:"+rows);
//            callback(err, rows);
//        }
//    });
//    console.log("\nConnection closed..");
//    p.releaseConnection(connectionLocation);
//}    
//
//function insertData(sqlQuery,callback){
//
//    console.log("\nSQL Query::"+sqlQuery);
//
//    var connectionFromPool = p.getConnection();
//    var connection = connectionFromPool[0].poolObject;
//    var connectionLocation = connectionFromPool[0].poolObjectLocation;
//
//    connection.query(sqlQuery, function(err, rows, fields) {
//        if(err){
//            console.log("ERROR: " + err.message);
//        }
//        else 
//        {    // return err or result
//            console.log("DB Results:"+rows);
//            callback(err, rows);
//        }
//    });
//    console.log("\nConnection closed..");
//    p.releaseConnection(connectionLocation);
//}   
//
//function updateData(sqlQuery,callback){
//
//    console.log("\nSQL Query::"+sqlQuery);
//
//    var connectionFromPool = p.getConnection();
//    var connection = connectionFromPool[0].poolObject;
//    var connectionLocation = connectionFromPool[0].poolObjectLocation;
//
//    connection.query(sqlQuery, function(err, rows, fields) {
//        if(err){
//            console.log("ERROR: " + err.message);
//        }
//        else 
//        {    // return err or result
//            console.log("DB Results:"+rows);
//            callback(err, rows);
//        }
//    });
//    console.log("\nConnection closed..");
//    p.releaseConnection(connectionLocation);
//}   
//
//function deleteData(sqlQuery,callback){
//
//    console.log("\nSQL Query::"+sqlQuery);
//
//    var connectionFromPool = p.getConnection();
//    var connection = connectionFromPool[0].poolObject;
//    var connectionLocation = connectionFromPool[0].poolObjectLocation;
//
//    connection.query(sqlQuery, function(err, rows, fields) {
//        if(err){
//            console.log("ERROR: " + err.message);
//        }
//        else 
//        {    // return err or result
//            console.log("DB Results:"+rows);
//            callback(err, rows);
//        }
//    });
//    console.log("\nConnection closed..");
//    p.releaseConnection(connectionLocation);
//}  

function fetchData(sqlQuery,callback){
	
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

function insertData(sqlQuery,callback){
	
	console.log("\nSQL Query::"+sqlQuery);
	
	var connection=getConnection();
	
	connection.query(sqlQuery, function(err, rows, fields) {
		if(err){
			console.log("ERROR: " + err.message);
			callback(err,rows);
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

function updateData(sqlQuery,callback){
	
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


function deleteData(sqlQuery,callback){
	
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









//------------------------------------------------
//function fetchData(callback,sqlQuery){
//	pool.getConnection(function(err,connection){
//		if(err){
//			connection.release;
//			return;
//			
//		}
//		connection.query(sqlQuery, function(err, rows, fields) {
//			if(err){
//			console.log("ERROR: " + err.message);
//		}
//			else 
//		{	
//			console.log("DB Results:"+rows);
//			callback(err, rows);
//			connection.release;
//		}
//		
//	});
//});
//}

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

//function insertData(sqlQuery,callback){
//console.log("\nSQL Query::"+sqlQuery);
//	
//pool.getConnection(function(err,connection){
//	if(err){
//		connection.release;
//		return;
//		
//	}
//	connection.query(sqlQuery, function(err, rows, fields) {
//		if(err){
//			
//			callback(err,rows);
//		}
//		else 
//		{	// return err or result
//			console.log("insertData -- DB Results:"+rows);
//			callback(err, rows);
//			connection.release;
//		}
//	});
//});
//}
//
//
//function updateData(sqlQuery,callback){
//	console.log("\nSQL Query::"+sqlQuery);
//		
//	pool.getConnection(function(err,connection){
//		if(err){
//			connection.release;
//			return;
//			
//		}
//		
//		connection.query(sqlQuery, function(err, rows, fields) {
//			if(err){
//				console.log("updateData -- ERROR: " + err.message);
//			}
//			else 
//			{	// return err or result
//				console.log("updateData -- DB Results:"+rows);
//				callback(err, rows);
//				connection.release;
//			}
//		});
//	});
//}

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
			if(err.message.includess("DUPLICATE")){
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
exports.deleteData=deleteData;