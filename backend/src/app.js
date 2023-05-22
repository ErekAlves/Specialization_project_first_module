const express = require('express');
const app = express();

const getAllIngredients = require('./routers/ingredientRouters');
const getSavoryRecipes  = require('./routers/savoryRecipeRouters');
const getSweetRecipes  = require('./routers/sweetRecipeRouters');
const getRecipes  = require('./routers/recipeRouters');



app.use(express.json());
app.use('/ingredients', getAllIngredients);
app.use('/savory', getSavoryRecipes);
app.use('/sweet', getSweetRecipes);
app.use('/recipes', getRecipes);


module.exports = app;