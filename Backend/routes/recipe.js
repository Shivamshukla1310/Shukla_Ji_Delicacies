const express = require("express")
const { getRecipes, getRecipe, addRecipe, deleteRecipe, editRecipe } = require("../controllers/recipe_controller")
const router = express.Router()

router.get("/", getRecipes) // This is to get all the recipies
router.get("/:id", getRecipe) // To get the recipe ID
router.post("/", addRecipe) // Adding the recipe
router.put("/:id", editRecipe) // To Edit recipe
router.delete("/:id", deleteRecipe) // To delete the recipes

module.exports = router