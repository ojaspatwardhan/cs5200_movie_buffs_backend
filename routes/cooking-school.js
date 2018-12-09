const express = require("express");

const CookingSchool = require("../models/cooking-school/cooking-school.model.server");

const router = express.Router();

findAllCookingSchool = (req,res) => {
    CookingSchool.find().then(cookingSchools => {
        if(!cookingSchools) {
            return res.status(401).json({
                message: "Cooking schools do not exist"
            });
        }
       res.send(cookingSchools);
    });
};

findCookingSchoolByChef = (req,res) => {
    CookingSchool.find({chefId: req.params.id}).then(cookingSchools => {
        console.log(cookingSchools);
        if(!cookingSchools) {
            return res.status(401).json({
                message: "Cooking Schools for that chef do not exist"
            });
        }
       res.send(cookingSchools);
    });
};

findCookingSchoolById = (req,res) => {
    console.log(req.params.id);
    CookingSchool.findById(req.params.id).then((cookingSchool) => {
        if(!cookingSchool) {
            return res.status(401).json({
                message: "Cooking school does not exist"
            });
        }
       res.send(cookingSchool);
    });
};

updateCookingSchool = (req, res) => {
    var cookingSchool = req.body;
    CookingSchool.findByIdAndUpdate(cookingSchool._id, {
    $set: {name: cookingSchool.name, image: cookingSchool.image,noOfSeats: cookingSchool.noOfSeats, duration: cookingSchool.duration, enrolledUser: cookingSchool.enrolledUser, chefId: cookingSchool.chefId}
    }, {
    new: true
    }, function(err) {
    if(err) {
        console.log("In error");
        res.status(500).json({error:err });
    }
    else {
        console.log("update working");
        res.send(cookingSchool);
    }
  });
};

deleteCookingSchool = (req,res) => {
    console.log(req.params.id);
    CookingSchool.findByIdAndDelete(req.params.id, (err) => {
        if(!err) {
            console.log("Deleted" + "cooking school " + req.params.id);
            res.status(200).json({
                message: 'deleted succesfully'
            });
        }
        else {
         res.status(500).json({
             message: 'error'
         });
        }
      });
};

enrollUserInCookingSchool = (req, res) => {
    var cookingSchool = req.body;
    console.log("In enroll user");
    console.log(cookingSchool);
    CookingSchool.findByIdAndUpdate(cookingSchool._id, { $inc: {noOfSeats: -1},
    $push: {enrolledUser: cookingSchool.enrolledUser} 
    }, {
    new: true
    }, function(err) {
    if(err) {
        console.log("In error");
        res.status(500).json({error:err });
    }
    else {
        console.log("Enrolled user in school");
        res.send(cookingSchool);
    }
  });
};

router.post("", (req, res, next) => {
    console.log(req.body);
        const cookingSchool = new CookingSchool({
            name: req.body.name, 
            image: req.body.image,
            noOfSeats: req.body.noOfSeats, 
            duration: req.body.duration, 
            chefId: req.body.chefId
        });
        CookingSchool.create(cookingSchool).then(result => {
            res.send(result);
        }).catch(err => {
            console.log("In error");
            res.status(500).json({error:err });
        });
});


router.get("/", findAllCookingSchool);

router.get("/:id", findCookingSchoolByChef);

router.get("/school/:id", findCookingSchoolById);

router.put("/:id", updateCookingSchool);

router.put("/user/:id", enrollUserInCookingSchool);

router.delete("/:id", deleteCookingSchool);

module.exports = router;
