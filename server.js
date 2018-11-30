var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
const mongoose = require('mongoose');
// mongoose.connect('mongodb://heroku_2rgcx7px:k1p3nnbe8kah44e9vaeam0ij7d@ds153845.mlab.com:53845/heroku_2rgcx7px');

//Configuration Varaibles for mongodb
//URI "mongodb://heroku_rqpg3b19:pktf9lbo3bkae7v8c9e9u0p0n0@ds259711.mlab.com:59711/heroku_rqpg3b19";
//ProjectURI "mongodb://heroku_2rgcx7px:k1p3nnbe8kah44e9vaeam0ij7d@ds153845.mlab.com:53845/heroku_2rgcx7px";

//(Assignment)Heroku frontend URL "https://student-enrollment-angular-app.herokuapp.com";

//Project Backend URL Heroku "https://lotus-lab-backend.herokuapp.com/";

//Project Frontend URL Heroku "https://lotus-lab.herokuapp.com";

//Local URL "http://localhost:4200";
//(Assignment)Mongo local URL "mongodb://localhost/webdev-summer-2018";
//(Project)Mongo local URL "mongodb://localhost/webdev-project";


app.use(session({
 resave: false,
 saveUninitialized: true,
 secret: 'any string'
}));

//Body Parser
app.use(bodyParser.json());

//CORS
app.use(function(req, res, next) {
res.header("Access-Control-Allow-Origin", "https://localhost:4200/recipe-app");
res.header("Access-Control-Allow-Headers",
"Origin, X-Requested-With, Content-Type, Accept");
res.header("Access-Control-Allow-Methods",
"GET, POST, PUT, DELETE, OPTIONS");
res.header("Access-Control-Allow-Credentials", "true");
next();
});


app.get('/', (req, res) => res.send('Hello World!'))

//Session test functions
app.get('/message/:theMessage', (req, res) => {
  var theMessage = req.params['theMessage'];
  res.send(theMessage);
})

app.get('/api/session/set/:name/:value',
setSession);
app.get('/api/session/get/:name',
getSession);
// app.get('/api/session/get',
// getSessionAll);
// app.get('/api/session/reset',
// resetSession);

function setSession(req, res) {
 var name = req.params['name'];
 var value = req.params['value'];
 req.session[name] = value;
 res.send(req.session);
}

function getSession(req, res) {
 var name = req.params['name'];
 var value = req.session[name];
 res.send(value);
}


app.listen(process.env.PORT || 4000, () => console.log('Example app listening on port 4000!'))
