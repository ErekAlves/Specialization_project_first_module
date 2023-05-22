const express = require('express');
const router = express.Router();

const sweetRecipeControllers = require('../controllers/sweetRecipeControllers');

router.get('/', sweetRecipeControllers.getSweetRecipes);
router.post('/add', sweetRecipeControllers.addSweetRecipe);
router.put('/:id', sweetRecipeControllers.updateSweetRecipe);
router.delete('/:id', sweetRecipeControllers.deleteSweetRecipe);


module.exports = router;