// controllers/recipe_controller.js
const Recipes = require("../models/recipe_model");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// ensure folder exists
const imagesDir = path.join(__dirname, "..", "public", "images");
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, imagesDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname) || "";
    const filename = Date.now() + "-" + file.fieldname + ext;
    cb(null, filename);
  },
});

const upload = multer({ storage: storage });

const getRecipes = async (req, res) => {
  try {
    const recipes = await Recipes.find().populate("createdBy", "email");
    return res.json(recipes);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getRecipe = async (req, res) => {
  try {
    const recipe = await Recipes.findById(req.params.id).populate("createdBy", "email");
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });
    res.json(recipe);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const addRecipe = async (req, res) => {
  try {
    let { title, ingredients, instructions, time } = req.body;

    // Validate required fields
    if (!title || !ingredients || !instructions) {
      return res.status(400).json({ message: "Required fields missing." });
    }

    // Normalize ingredients: accept JSON array or comma-separated string
    let parsedIngredients = ingredients;
    if (typeof ingredients === "string") {
      // try to parse JSON if client sent JSON stringified array
      try {
        const maybeArray = JSON.parse(ingredients);
        if (Array.isArray(maybeArray)) parsedIngredients = maybeArray;
      } catch (e) {
        // if not JSON, split by comma
        parsedIngredients = ingredients.split(",").map((i) => i.trim()).filter(Boolean);
      }
    }

    const recipeData = {
      title,
      ingredients: parsedIngredients,
      instructions,
      time,
    };

    // handle uploaded file if present
    if (req.file) {
      // store relative path or URL as you prefer
      recipeData.coverImage = req.file.filename;

    }

    // optional: attach createdBy if req.user is set (from auth middleware)
    if (req.user && req.user.id) {
      recipeData.createdBy = req.user.id;
    }

    const newRecipe = await Recipes.create(recipeData);
    return res.status(201).json(newRecipe);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error while adding recipe", error: error.message });
  }
};

const editRecipe = async (req, res) => {
  try {
    let updates = req.body;

    // Normalize ingredients same as addRecipe
    if (updates.ingredients && typeof updates.ingredients === "string") {
      try {
        const maybeArray = JSON.parse(updates.ingredients);
        if (Array.isArray(maybeArray)) updates.ingredients = maybeArray;
        else {
          updates.ingredients = updates.ingredients.split(",").map((i) => i.trim()).filter(Boolean);
        }
      } catch (e) {
        updates.ingredients = updates.ingredients.split(",").map((i) => i.trim()).filter(Boolean);
      }
    }

    if (req.file) {
      updates.coverImage = req.file.filename;

    }

    const updated = await Recipes.findByIdAndUpdate(req.params.id, updates, { new: true });

    if (!updated) return res.status(404).json({ message: "Recipe not found" });

    return res.json(updated);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteRecipe = async (req, res) => {
  try {
    const deleted = await Recipes.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Recipe not found" });

    // optionally remove cover image file from disk if exists
    if (deleted.coverImage) {
      const filePath = path.join(__dirname, "..", "public", deleted.coverImage);
      // remove leading slash if any
      const normalized = filePath.replace("//", "/");
      fs.unlink(normalized, (err) => {
        // ignore errors
      });
    }

    res.json({ message: "Recipe deleted" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = { getRecipes, getRecipe, addRecipe, editRecipe, deleteRecipe, upload };





// const Recipes = require("../models/recipe_model")
// const multer = require('multer')

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './public/images')
//   },
//   filename: function (req, file, cb) {
//     const filename = Date.now() + '-' + file.fieldname
//     cb(null, filename)
//   }
// })

// const upload = multer({ storage: storage })

// const getRecipes = async (req, res) => {
//   const recipes = await Recipes.find()
//   return res.json(recipes)  // this will check the total number of items in database
// }

// const getRecipe = async (req, res) => {
//   const recipe = await Recipes.findById(req.params.id)
//   res.json(recipe)
// }

// // const addRecipe = async (req, res) => {
// //   const { title, ingredients, instructions, time } = req.body

// //   if (!title || !ingredients || !instructions) {
// //     res.json({
// //       message: "Required Fields Please Enter The Details"
// //     })
// //   }
// //   const newRecipe = await Recipes.create({
// //     title, ingredients, instructions, time
// //   })
// //   return res.json(newRecipe)
// // }

// const addRecipe = async (req, res) => {
//   try {
//     const { title, ingredients, instructions, time } = req.body; // destructure the req.body

//     if (!title || !ingredients || !instructions) {
//       return res.status(400).json({
//         message: "Required fields missing. Please enter all details."
//       });
//     }

//     const newRecipe = await Recipes.create({
//       title,
//       ingredients,
//       instructions,
//       time
//     });

//     return res.status(201).json(newRecipe);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       message: "Server error while adding recipe",
//       error: error.message
//     });
//   }
// };



// const editRecipe = async (req, res) => {
//   const { title, ingredients, instructions, time } = req.body // Again destructuring the req.body
//   let recipe = await Recipes.findById(req.params.id)
//   try {
//     if (recipe) {
//       await Recipes.findByIdAndUpdate(req.params.id, req.body, { new: true })
//       res.json({ title, ingredients, instructions, time })
//     }
//   }
//   catch (error) {
//     return res.status(404).json({ message: error })
//   }
// }

// const deleteRecipe = async (req, res) => {
//   try {
//     await Recipes.deleteOne({ _id: req.params.id })
//     res.json({ status: "ok" })
//   }
//   catch (err) {
//     return res.status(400).json({ message: "error" })
//   }
// }
// module.exports = { getRecipes, getRecipe, addRecipe, editRecipe, deleteRecipe, upload }