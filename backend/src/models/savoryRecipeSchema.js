const {Validator} = require('jsonschema');
const validator = new Validator();

const ingredientSchema = require('./ingredientSchema');

const savoryRecipeSchema = {
    type: 'object',
    properties: {
        name: { type: 'string' },
        ingredients: {
            type: 'array',
            items: ingredientSchema
        },
        instructions: { type: 'string' }
    },
    required: ['name', 'ingredients', 'instructions']
};
      
const validateDataSavoryRecipes = (e)=>{
    return validator.validate(e,savoryRecipeSchema);
};

module.exports= {validateDataSavoryRecipes};