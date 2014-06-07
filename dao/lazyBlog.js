var config = require("../config");
var util = require("util");
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
console.log("url:"+config.db);
mongoose.connect("mongodb://localhost/test");

exports.disconnect = function(callback){
   mongoose.disconnect(callback);
}

var User = new Schema(
  {
   username:String,
   password:{type:String,default:'1234'},
   email:String,
   phone:String,
   reg_date:{type:Date,default:Date.now}	
}	
);
User =  mongoose.model('User',User);
exports.add = function(user,callback){
 if(user){
    User.save(function(err){
	if(err){
	util.log(err);    
}
});
}	
}
exports.query = function(username,callback)
{
   if(username)
	{
          console.log(username);   
	  User.findOne({'username':username},function(err,obj)
		{
		  if(err){
     		    util.log(err);
		    callback(err,null);		
                   } 
		  callback(null,obj);
		});	
	}	
}
