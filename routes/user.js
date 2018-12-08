const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user/user.model.server");

const router = express.Router();

findUserByUsername = (req,res) => {
    let name = req.params.username;

    User.findOne({username: name}).then(user => {
        if(!user) {
            return res.status(401).json({
                message: "User does not exist"
            });
        }
       res.send(user);
    });
};

updateUser = (req, res) => {
    var user = req.body;
    console.log(user.first_name + " " + "inside update user");
    User.findByIdAndUpdate(user._id, {
    $set: {username: user.username, password: user.password, first_name: user.first_name, last_name: user.last_name, email: user.email, address_1: user.address_1, address_2: user.address_2, city: user.city, state: user.state, zip: user.zip}
    }, {
    new: true
    }, function(err) {
    if(err) {
        throw err;
    }
    else {
        console.log("update working");
        res.send(user);
    }
  });
};

deleteUser = (req,res) => {
    User.findByIdAndRemove(req.body.id, (err) => {
        if(err) {
          throw err;
        }
        else {
          console.log("Deleted" + "user " + id);
        }
      });
};

router.post("/signup", (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then(hash => {
        const user = new User({
            username: req.body.username,
            password: hash
        });
        User.create(user).then(result => {

            const token = jwt.sign({
                username: result.username,
                userId: result._id
            }, "geralt the wolf witcher", {expiresIn: "1hr"});

            res.status(200).json({
                token: token,
                expiresIn: 3600,
                username: result.username,
                userId: result._id
            });
        }).catch(err => {
            console.log("In error");
            res.status(500).json({error:err });
        });
    });
});

router.post("/login", (req, res, next) => {
    let retrievedUser;
    var usr = req.body;
    User.findOne({username: usr.username})
    .then(user => {
        if(!user) {
            return res.status(401).json({
                message: "Authentication failed 1"
            });
        }
        retrievedUser = user;
        return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
        if(!result){
            return res.status(401).json({
                message: "Authentication failed 2"
            });
        }
        const token = jwt.sign({
            userId: retrievedUser._id,
            username: retrievedUser.username
        }, "geralt the wolf witcher", {expiresIn: "1hr"});

        res.status(200).json({
            token: token,
            expiresIn: 3600,
            username: retrievedUser.username,
            userId: retrievedUser._id
        })
    }).catch(err => {
        return res.status(401).json({
            message: "Authentication failed 3"
        });
    });
});

router.get("/profile/:username", findUserByUsername);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

module.exports = router;
