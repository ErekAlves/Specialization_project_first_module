const express = require('express');
const router = express.Router();

const recipeControllers = require('../controllers/recipeControllers');

router.get('/', recipeControllers.getRecipes);
router.put('/:recipeType/:id', recipeControllers.updateRecipe);
router.delete('/:recipeType/:id', recipeControllers.deleteRecipe);


module.exports = router;