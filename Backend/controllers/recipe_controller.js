const Recipes = require("../models/recipe_model")

const getRecipes = async (req, res) => {
  const recipes = await Recipes.find()
  return res.json(recipes)  // this will check the total number of items in database
}

const getRecipe = async (req, res) => {
  const recipe = await Recipes.findById(req.params.id)
  res.json(recipe)
}

// const addRecipe = async (req, res) => {
//   const { title, ingredients, instructions, time } = req.body

//   if (!title || !ingredients || !instructions) {
//     res.json({
//       message: "Required Fields Please Enter The Details"
//     })
//   }
//   const newRecipe = await Recipes.create({
//     title, ingredients, instructions, time
//   })
//   return res.json(newRecipe)
// }

const addRecipe = async (req, res) => {
  try {
    const { title, ingredients, instructions, time } = req.body; // destructure the req.body

    if (!title || !ingredients || !instructions) {
      return res.status(400).json({
        message: "Required fields missing. Please enter all details."
      });
    }

    const newRecipe = await Recipes.create({
      title,
      ingredients,
      instructions,
      time
    });

    return res.status(201).json(newRecipe);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error while adding recipe",
      error: error.message
    });
  }
};


const deleteRecipe = (req, res) => {
  res.json({ message: "Hello Ji Shukla Ji Here..." })
}

const editRecipe = async (req, res) => {
  const { title, ingredients, instructions, time } = req.body // Again destructuring the req.body
  let recipe = await Recipes.findById(req.params.id)
  try {
    if (recipe) {
      await Recipes.findByIdAndUpdate(req.params.id, req.body, { new: true })
      res.json({ title, ingredients, instructions, time })
    }
  }
  catch (error) {
    return res.status(404).json({ message: "error" })
  }
}

module.exports = { getRecipes, getRecipe, addRecipe, editRecipe, deleteRecipe }