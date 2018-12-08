const express = require("express");

const Recipe = require("../models/recipe/recipe.model.server");

const router = express.Router();

findRecipes = (req,res) => {
    Recipe.find().then(recipes => {
        if(!recipes) {
            return res.status(401).json({
                message: "Recipes do not exist"
            });
        }
       res.send(recipes);
    });
};

updateRecipe = (req, res) => {
    var recipe = req.body;
    console.log(user.first_name + " " + "inside update user");
    Recipe.findByIdAndUpdate(user._id, {
    $set: {title: recipe.title, image: recipe.image, instructions: recipe.instructions, readyInMinutes: recipe.readyInMinutes, servings: recipe.servings, extendedIngredients: recipe.extendedIngredients, creator: recipe.creator}
    }, {
    new: true
    }, function(err) {
    if(err) {
        throw err;
    }
    else {
        console.log("update working");
        res.send(recipe);
    }
  });
};

deleteRecipe = (req,res) => {
    Recipe.findByIdAndRemove(req.body.id, (err) => {
        if(err) {
          throw err;
        }
        else {
          console.log("Deleted" + "recipe " + id);
        }
      });
};

router.post("", (req, res, next) => {
        const recipe = new Recipe({
            title: req.body.title,
            image: req.body.image,
            instructions: req.body.instructions,
            readyInMinutes: req.body.readyInMinutes,
            servings: req.body.servings,
            extendedIngredients: req.body.extendedIngredients,
            creator: req.body.userId
        });
        Recipe.create(recipe).then(result => {

            res.send(result);
        }).catch(err => {
            console.log("In error");
            res.status(500).json({error:err });
        });
});


router.get("/recipes", findRecipes);

router.put("/:id", updateRecipe);

router.delete("/:id", deleteUser);

module.exports = router;
