const express = require('express');
const router = express.Router();

const savoryRecipeControllers = require('../controllers/savoryRecipeControllers');

router.get('/', savoryRecipeControllers.getSavoryRecipes);
router.post('/add', savoryRecipeControllers.addSavoryRecipe);
router.put('/:id', savoryRecipeControllers.updateSavoryRecipe);
router.delete('/:id', savoryRecipeControllers.deleteSavoryRecipe);


module.exports = router;