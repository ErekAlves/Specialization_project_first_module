const {Validator} = require('jsonschema');
const validator = new Validator();

const ingredientSchema = {
    type: 'object',
    properties: {
        name: { type: 'string' },
        quantity: { type: 'string' }
    },
    required: ['name']
};

const validateDataIngredients = (e)=>{
    return validator.validate(e,ingredientSchema);
};

module.exports= {validateDataIngredients};
