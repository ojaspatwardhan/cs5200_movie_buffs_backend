const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user/user.model.server");

const router = express.Router();

router.post("/signup", (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then(hash => {
        const user = new User({
            username: req.body.username,
            password: hash
        });
        User.create(user).then(result => {
            const token = jwt.sign({
                email: result.email,
                userId: result._id
            }, "geralt the wolf witcher", {expiresIn: "1hr"});

            return res.status(200).json({
                token: token,
                expiresIn: 3600,
                userId: result._id,
                username: result.username
            })
        }).catch(err => {
            console.log("In error");
            res.status(500).json({error:err });
        });
    });
});

router.post("/login", (req,res,next) => {
    let retrievedUser;
    User.findOne({email: req.body.email})
    .then(user => {
        if(!user) {
            return res.status(401).json({
                message: "Authentication failed"
            });
        }
        retrievedUser = user;
        return bcrypt.compare(req.body.password, user.password);
    })
    .then(res => {
        if(!res){
            return res.status(401).json({
                message: "Authentication failed"
            });
        }
        const token = jwt.sign({
            email: retrievedUser.email,
            userId: retrievedUser._id
        }, "geralt the wolf witcher", {expiresIn: "1hr"});

        res.status(200).json({
            token: token,
            expiresIn: 3600,
            userId: retrievedUser._id
        })
        .catch( err => {
            return res.status(401).json({
                message: "Authentication failed"
            });
        });
    });
});

findUserByUsername = (req,res) => {
    let name = req.params.username;

    User.findOne({username: name}).then((user) => {
        if(!user) {
            return res.status(401).json({
                message: "User does not exist"
            });
        }
        res.send(user);
    });
};

router.get("/profile/:username", findUserByUsername);

module.exports = router;
