const {Validator} = require('jsonschema');
const validator = new Validator();

const ingredientSchema = require('./ingredientSchema');

const sweetRecipeSchema = {
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

const validateDataSweetRecipes = (e)=>{
    return validator.validate(e,sweetRecipeSchema);
};

module.exports= {validateDataSweetRecipes};