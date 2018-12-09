const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user/user.model.server");

const router = express.Router();


findAllUsers = (req, res) => {
  User.find().then((users) => {
    res.send(users);
  });
}

logout = (req, res) => {
  req.session.destroy();
  res.sendStatus(200);
}

createUserByAdmin = (req, res) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
      const user = new User({
          username: req.body.username,
          password: hash,
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          email: req.body.email,
          address_1: req.body.address_1,
          role: req.body.role
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
};

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
    User.findByIdAndUpdate(user._id, {
    $set: {username: user.username, password: user.password, first_name: user.first_name, last_name: user.last_name, email: user.email, address_1: user.address_1, address_2: user.address_2, city: user.city, state: user.state, zip: user.zip, role: user.role}
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
  var id = req.params.id;
    User.findByIdAndRemove(req.params.id, (err) => {
        if(err) {
          throw err;
        }
        else {
          res.send("deleted");
        }
      });
};

findUserById = (req, res) => {
  let id = req.params.id;

  User.findById(id).then((user) => {
    res.send(user);
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

router.post("/logout", logout);

router.post("/admin", createUserByAdmin);

router.get("/id/:id", findUserById);

router.get("/users", findAllUsers);

router.get("/profile/:username", findUserByUsername);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

module.exports = router;
