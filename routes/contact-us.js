const express = require("express");

const ContactUs = require("../models/contact-us/contact-us.model.server");

const router = express.Router();

findAllQueries = (req,res) => {
    ContactUs.find().then(queries => {
        if(!queries) {
            return res.status(401).json({
                message: "Any contact us query do not exist"
            });
        }
       res.send(queries);
    });
};

findQueryByEmail = (req,res) => {
    ContactUs.find({email: req.params.email}).then(query => {
        console.log(query);
        if(!query) {
            return res.status(401).json({
                message: "Contact us query/s for that email does not exist."
            });
        }
       res.send(query);
    });
};

findQueryById = (req,res) => {
    console.log(req.params.id);
    ContactUs.findById(req.params.id).then((query) => {
        if(!query) {
            return res.status(401).json({
                message: "Query does not exist for Id"
            });
        }
       res.send(query);
    });
};

router.post("", (req, res, next) => {
    console.log(req.body);
        const query = new ContactUs({
            email: req.body.email,
            text: req.body.query
        });
        ContactUs.create(query).then(result => {
            res.send(result);
        }).catch(err => {
            console.log("In error");
            res.status(500).json({error:err });
        });
});

router.get("/email/:email", findQueryByEmail);

router.get("/", findAllQueries);

router.get("/:id", findQueryById);

module.exports = router;
