const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const userRoutes = require('./routes/user');

const app = express();

mongoose.connect("mongodb://localhost/recipe-project")
.then(() => {
    console.log("Connected to database");
})
.catch(() => {
    console.log("Connection failed");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use("/api/user", userRoutes);

module.exports = app;
