
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , ejs  = require('ejs')
  , dao = require('./dao/lazyBlog.js')
  , controller = require('./controller/lazyBlog.js')
  , SessionStore = require("session-mongoose")(express)
 // , mailer = require('mailer')
;
var store = new SessionStore({
    url:"mongodb://localhost/session",
    interval:120000
});

var app = express();

// all environments
app.set('port', process.env.PORT || 8080);
app.set('views', __dirname + '/views');
app.engine('.html',ejs.__express);
app.set('view engine', 'html');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.cookieSession({secret:'fens.me'}));
app.use(express.session({
secret:'fens.me',
store:store,
cookie:{maxAge:900000}
}));
app.use(function(req,res,next){
res.locals.user = req.session.user;
next();
});
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
//app.post('/mail',routes.mail);
//app.all('/login',notAuthentication);
app.get('/login', routes.login);
app.post('/login', routes.doLogin);
//app.get('/logout',notAuthentication);
app.get('/logout', routes.logout);
//app.get('/home',authentication);
app.get('/home', routes.home);
//app.get('/email',function(req,res,next){
//console.log("start to send mail");

//consol.elog("complete to send mail");
//rt.sendMail(req,res,callback){
// console.log("start to send mail");
// email.send(
//    {
//        ssl: true,
//        host : "",
//        to : "",
//        from : "349502949@qq.com",
//        subject : "new contact",
//        reply_to: "",
//       body: "Hello! This is a test of the node_mailer.",
//        authentication : "login",
//        username :"" ,
//        password : "",
//        debug: true
//    },
//    function(err, result){
//        if(err){ console.log("the err: ",err); }
//    }
//);
//console.log("send success!");
//}
//});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
