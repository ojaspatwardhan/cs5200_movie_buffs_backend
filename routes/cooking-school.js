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
    console.log("In update cooking school " + cookingSchool);
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
    $set: {enrolledUser: cookingSchool.enrolledUser}
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

enrollUserThroughAdminInCookingSchool = (req,res) => {
    const value = req.body;
    console.log("In enroll user of cooking school through admin");
    console.log(value);
    CookingSchool.findByIdAndUpdate(value.schoolId, { $inc: {noOfSeats: -1},
        $push: {enrolledUser: value.id}},
        {
            new: true
            }, function(err) {
            if(err) {
                console.log("In error");
                res.status(500).json({error:err });
            }
            else {
                console.log("Enrolled user in school");
                res.send(value);
        }});
}

unenrollUserFromSchool= (req, res) => {
    var cookingSchool = req.body;
    console.log("In unenroll user of cooking school");
    console.log(cookingSchool.id + " " + cookingSchool.schoolId);
    CookingSchool.findByIdAndUpdate(cookingSchool.schoolId, {
    $pull: {enrolledUser: cookingSchool.id},  $inc: {noOfSeats: 1}
    }, {
    new: true
    }, function(err) {
    if(err) {
        console.log("In error");
        res.status(500).json({error:err });
    }
    else {
        console.log("Unenrolled user in school");
        res.send(cookingSchool);
    }
  });
};

addRecipeInCookingSchool = (req,res) => {
    var cookingSchool = req.body;
    console.log("In add recipe cooking school " + cookingSchool);
    CookingSchool.findByIdAndUpdate(cookingSchool.id, {
        $push: {recipes: cookingSchool.recipeId}
    }, {
        new: true
    }, function(err) {
        if(err) {
            console.log("In error of add recipe in cooking school");
            res.status(500).json({error:err });
        }
        else {
            console.log("Added recipe to cooking school");
            res.send(cookingSchool);
        }
    });
};

removeRecipeFromCookingSchool = (req,res) => {
    var cookingSchool = req.body;
    console.log("In remove recipe cooking school " + cookingSchool);
    CookingSchool.findByIdAndUpdate(cookingSchool.id, {
        $pull: {recipes: cookingSchool.recipeId}
    }, {
        new: true
    }, function(err) {
        if(err) {
            console.log("In error of delete recipe in cooking school");
            res.status(500).json({error:err });
        }
        else {
            console.log("Deleted recipe to cooking school");
            res.send(cookingSchool);
        }
    });
};

findSchoolByName = (req, res) => {
  CookingSchool.findOne({name: req.params.name}).then((school) => {
    res.send(school);
  });
};

findRecipeInCookingSchool = (req,res) => {
    CookingSchool.findById(req.params.id).then((school) => {
        res.send(school);
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

router.get("/name/:name", findSchoolByName);

router.get("/", findAllCookingSchool);

router.get("/:id", findCookingSchoolByChef);

router.get("/school/:id", findCookingSchoolById);

router.get("/recipe/:id", findRecipeInCookingSchool);

router.put("/:id", updateCookingSchool);

router.put("/user/:id", enrollUserInCookingSchool);

router.put("/school/unenroll", unenrollUserFromSchool);

router.put("/school/admin/enroll", enrollUserThroughAdminInCookingSchool);

router.put("/recipe/add", addRecipeInCookingSchool);

router.put("/recipe/remove", removeRecipeFromCookingSchool);

router.delete("/:id", deleteCookingSchool);

module.exports = router;
