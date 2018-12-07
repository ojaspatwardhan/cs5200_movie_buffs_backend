const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user/user.model.server");

const router = express.Router();

findUserByUsername = (req,res) => {
    console.log("In find user by username");
    console.log(req.params.username);
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

updateUser = (req,res) => {
    bcrypt.hash(req.body.password, 10).then(hash => {
        User.findByIdAndUpdate(req.body.id, {
        $set: {username: req.body.username, password: hash, first_name: req.body.firstName, last_name: req.body.lastName, email: req.body.email}
        }, {
        new: true
        }, function(err) {
        if(err) {
            throw err;
        }
        else {
            console.log("update working");
        }
    })});
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

            return res.status(200).json({
                token: token,
                expiresIn: 3600,
                username: result.username,
                userId: result._id
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
            userId: result._id,
            username: result.username
        }, "geralt the wolf witcher", {expiresIn: "1hr"});

        res.status(200).json({
            token: token,
            expiresIn: 3600,
            username: result.username,
            userId: result._id
        })
        .catch( err => {
            return res.status(401).json({
                message: "Authentication failed"
            });
        });
    });
});

router.get("/profile/:username", findUserByUsername);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

module.exports = router;
