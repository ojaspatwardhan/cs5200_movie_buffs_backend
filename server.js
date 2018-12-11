const express = require('express');
const mongoose = require('mongoose');
var session = require('express-session');
const bodyParser = require('body-parser');

const userRoutes = require('./routes/user');
const recipeRoutes = require('./routes/recipe');
const cookingSchoolRoutes = require('./routes/cooking-school');
const advertisementRoutes = require('./routes/advertisement');


const app = express();

//Backend Local url
localUrl = "mongodb://localhost/recipe-project";
//Backend Heroku url
herokuUrl = "mongodb://heroku_v4z5qmj9:eebijl3lttnpp562p91ee55p4k@ds129454.mlab.com:29454/heroku_v4z5qmj9";

//Front end local url
frontEndLocal = "http://localhost:4200";

//Frontend heroku url
frontEndHeroku = "https://dbms-recipe-app-frontend.herokuapp.com";

app.use(session({
 resave: false,
 saveUninitialized: true,
 secret: 'any string'
}));

mongoose.connect("mongodb://heroku_v4z5qmj9:eebijl3lttnpp562p91ee55p4k@ds129454.mlab.com:29454/heroku_v4z5qmj9")
.then(() => {
    console.log("Connected to database");
})
.catch(() => {
    console.log("Connection failed");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));


app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "https://dbms-recipe-app-frontend.herokuapp.com");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
});

app.use("/api/user", userRoutes);
app.use("/api/recipe", recipeRoutes);
app.use("/api/cooking-school", cookingSchoolRoutes);
app.use("/api/advertisement", advertisementRoutes);

app.listen(process.env.PORT || 4000, () => console.log('Example app listening on port 4000!'))
module.exports = app;
