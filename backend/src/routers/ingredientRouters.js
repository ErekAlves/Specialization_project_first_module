const express = require('express');
const router = express.Router();

const ingredientControllers = require('../controllers/ingredientControllers');

router.get('/', ingredientControllers.getIngredients);
router.post('/add', ingredientControllers.addIngredient);
router.put('/:id', ingredientControllers.updateIngredient);
router.delete('/:id', ingredientControllers.deleteIngredient);


module.exports = router;