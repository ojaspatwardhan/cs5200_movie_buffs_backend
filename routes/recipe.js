const express = require("express");

const Recipe = require("../models/recipe/recipe.model.server");

const router = express.Router();

findAllRecipes = (req, res) => {
  Recipe.find().then((recipes) => {
    res.send(recipes);
  });
}

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

findRecipesForUser = (req,res) => {
    console.log("In find recipes of user: " + req.params.id);
    Recipe.find({creator: req.params.id}).then(recipes => {
        console.log(recipes);
        if(!recipes) {
            return res.status(401).json({
                message: "Recipes do not exist"
            });
        }
       res.send(recipes);
    });
};

findRecipeById = (req,res) => {
    console.log(req.params.id);
    Recipe.findById(req.params.id).then((recipe) => {
        if(!recipe) {
            return res.status(401).json({
                message: "Recipes do not exist"
            });
        }
       res.send(recipe);
    });
};

updateRecipe = (req, res) => {
    var recipe = req.body;
    Recipe.findByIdAndUpdate(recipe._id, {
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
    console.log(req.params.id);
    Recipe.findByIdAndDelete(req.params.id, (err) => {
        if(!err) {
            console.log("Deleted" + "recipe " + req.params.id);
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

router.post("", (req, res, next) => {
    console.log(req.body);
        const recipe = new Recipe({
            title: req.body.title,
            image: req.body.image,
            instructions: req.body.instructions,
            readyInMinutes: req.body.readyInMinutes,
            servings: req.body.servings,
            extendedIngredients: req.body.extendedIngredients,
            creator: req.body.creator
        });
        Recipe.create(recipe).then(result => {

            res.send(result);
        }).catch(err => {
            console.log("In error");
            res.status(500).json({error:err });
        });
});

router.get("/recipes/all", findAllRecipes);

router.get("/recipes", findRecipes);

router.get("/:id", findRecipesForUser);

router.get("/edit/:id", findRecipeById);

router.put("/:id", updateRecipe);

router.delete("/:id", deleteRecipe);

module.exports = router;
