
/*
 * GET home page.
 */

var dao = require('../dao/lazyBlog');
exports.index = function(req, res){
res.render('index', { title: 'Aotemen' });
};
exports.login = function(req, res){
res.render('login', { title: 'login'});
};
exports.doLogin = function(req, res){
var user= "";
console.log(req.body.username);
dao.query(req.body.username,function(err,obj){
    if(err){
   	console.log(err);
     }
   console.log(obj); 
   if(req.body.password==obj.password){

   	req.session.user = obj;
	res.redirect('/home');
	return;
	}
	res.redirect('/login');
	return;	
});
};
exports.logout = function(req, res){
req.session.user=null;
res.redirect('/');
};
exports.home = function(req, res){
res.render('home', { title: 'Home'});
};
