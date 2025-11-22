const express = require("express");
const {
  getRecipes,
  getRecipe,
  addRecipe,
  deleteRecipe,
  editRecipe,
  upload, // multer middleware exported from controller
} = require("../controllers/recipe_controller");
const router = express.Router();

router.get("/", getRecipes);
router.get("/:id", getRecipe);

// If you want to accept an image with fieldname "coverImage", use upload.single:
router.post("/", upload.single("coverImage"), addRecipe);

// For edit, allow optional file upload as well:
router.put("/:id", upload.single("coverImage"), editRecipe);

router.delete("/:id", deleteRecipe);

module.exports = router;





// const express = require("express")
// const { getRecipes, getRecipe, addRecipe, deleteRecipe, editRecipe } = require("../controllers/recipe_controller")
// const router = express.Router()

// router.get("/", getRecipes) // This is to get all the recipies
// router.get("/:id", getRecipe) // To get the recipe ID
// router.post("/", addRecipe) // Adding the recipe
// router.put("/:id", editRecipe) // To Edit recipe
// router.delete("/:id", deleteRecipe) // To delete the recipes

// module.exports = router