const express = require("express");

const Advertisement = require("../models/advertisement/advertisement.model.server");

const router = express.Router();

findAdvertisementByName = (req,res) => {
    let advertisementName = req.params.name;

    Advertisement.findOne({name: advertisementName}).then(advertisement => {
        if(!advertisement) {
            return res.status(401).json({
                message: "Advertisement does not exist"
            });
        }
       res.send(advertisement);
    });
};

findAllAdvertisement = (req,res) => {
    Advertisement.find().then((response) => {
        res.send(response);
    });
};

findAdvertisementById = (req,res) => {
    Advertisement.findById(req.params.id).then((response) => {
        res.send(response);
    });
};

updateAdvertisement = (req, res) => {
    var advertisement = req.body;
    Advertisement.findByIdAndUpdate(cookingSchool._id, {
    $set: {name: advertisement.name, image: advertisement.image}
    }, {
    new: true
    }, function(err) {
    if(err) {
        console.log("Error updating advertisement.");
        res.status(500).json({error:err });
    }
    else {
        console.log("update advertisement working");
        res.send(cookingSchool);
    }
  });
};

deleteAdvertisement = (req,res) => {
    console.log(req.params.id);
    Advertisement.findByIdAndDelete(req.params.id, (err) => {
        if(!err) {
            console.log("Deleted" + " advertisement " + req.params.id);
            res.status(200).json({
                message: 'deleted advertisement succesfully'
            });
        }
        else {
         res.status(500).json({
             message: 'error in deleting advertisement'
         });
        }
      });
};

router.post("", (req, res, next) => {
    console.log(req.body);
        const advertisement = new Advertisement({
            name: req.body.name,
            image: req.body.image
        });
        Advertisement.create(advertisement).then(result => {
            res.send(result);
        }).catch(err => {
            console.log("In error");
            res.status(500).json({error:err });
        });
});

router.get("/:name", findAdvertisementByName);

router.get("/:id", findAdvertisementById);

router.get("/", findAllAdvertisement)

router.put("/:id", updateCookingSchool);

router.delete("/:id", deleteCookingSchool);

module.exports = router;
