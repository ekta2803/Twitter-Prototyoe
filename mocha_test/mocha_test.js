/**
 * New node file
 */
var request = require('request')
, express = require('express')
,assert = require("assert")
,http = require("http");

describe('http tests', function(){

	it('should return the signup page', function(done) {
		request.get(
			    'http://localhost:1121/signup',
			    function (error, response, body) {
			    	assert.equal(200, response.statusCode);
			    	done();
			    }
			);
	  });

	it('should login', function(done) {
		request.post(
			    'http://localhost:1121/login',
			    { form: { username: 'ekta2803',password:'ekta2803' } },
			    function (error, response, body) {
			    	assert.equal(200, response.statusCode);
			    	done();
			    }
			);
	  });
	
	it('should return following users for given user_id', function(done) {
		request.post(
			    'http://localhost:1121/getFollowing',
			    { form: { user_id: '1'} },
			    function (error, response, body) {
			    	assert.equal(200, response.statusCode);
			    	done();
			    }
			);
	  });
	
	it('should retrieve the current user details', function(done) {
		request.post(
			    'http://localhost:1121/currentUser',
			  
			    function (error, response, body) {
			    	assert.equal(200, response.statusCode);
			    	done();
			    }
			);
	  });
	
	it('should logout', function(done) {
		request.post(
			    'http://localhost:1121/logout',
			    function (error, response, body) {
			    	assert.equal(200, response.statusCode);
			    	done();
			    }
			);
	  });
	
	
});