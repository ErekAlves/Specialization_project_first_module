const { v4: uuidv4 } = require('uuid');
const { validateDataIngredients } = require('../models/ingredientSchema');

const fs = require('fs');

function getIngredientsPromise() {
    return new Promise((resolve, reject) => {
        fs.readFile('src/models/data/ingredients.json', 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                let ingredients = JSON.parse(data);
                resolve(ingredients);
            }
        });
    });
}

const getIngredients = (req, res) => {
    getIngredientsPromise()
        .then((ingredients) => res.status(200).json(ingredients))
        .catch((err) => res.status(500).send(err.message));
};

function addIngredientPromise(ingredient) {
    return new Promise((resolve, reject) => {
        fs.readFile('src/models/data/ingredients.json', 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                let ingredients = JSON.parse(data);

                const id = uuidv4();
                const ingredientNew = { id, ...ingredient };

                ingredients.push(ingredientNew);

                fs.writeFile('src/models/data/ingredients.json', JSON.stringify(ingredients), (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(ingredientNew);
                    }
                });
            }
        });
    });
}

const addIngredient = (req, res) => {
    const ingredient = req.body;

    const validResult = validateDataIngredients(ingredient);

    if (!validResult.valid) {
        return res.status(400).json({ message: 'Invalid ingredient Data', errors: validResult.errors });
    }

    addIngredientPromise(ingredient)
        .then((ingredientNew) => res.status(200).json(ingredientNew))
        .catch((err) => res.status(500).send(err.message));
};


function updateIngredientPromise(id, ingredient) {
    return new Promise((resolve, reject) => {
        fs.readFile('src/models/data/ingredients.json', 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                let ingredients = JSON.parse(data);
                const index = ingredients.findIndex((i) => i.id === id);
  
                if (index === -1) {
                    reject(new Error('Ingredient not found'));
                } else {
                    const ingredientUpdated = { id, ...ingredient };
                    ingredients[index] = ingredientUpdated;
  
                    fs.writeFile('src/models/data/ingredients.json', JSON.stringify(ingredients), (err) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(ingredientUpdated);
                        }
                    });
                }
            }
        });
    });
}
  
const updateIngredient = (req, res) => {
    const id = req.params.id;
    const ingredient = req.body;
  
    updateIngredientPromise(id, ingredient)
        .then((ingredientUpdated) => res.status(200).json(ingredientUpdated))
        .catch((err) => res.status(500).send(err.message));
};

function deleteIngredientPromise(id) {
    return new Promise((resolve, reject) => {
        fs.readFile('src/models/data/ingredients.json', 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                let ingredients = JSON.parse(data);
                const index = ingredients.findIndex((i) => i.id === id);
  
                if (index === -1) {
                    reject(new Error('Ingredient not found'));
                } else {
                    ingredients.splice(index, 1);
  
                    fs.writeFile('src/models/data/ingredients.json', JSON.stringify(ingredients), (err) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve();
                        }
                    });
                }
            }
        });
    });
}
  
const deleteIngredient = (req, res) => {
    const id = req.params.id;
  
    deleteIngredientPromise(id)
        .then(() => res.status(200).json({ message: 'Ingredient Deleted' }))
        .catch((err) => res.status(500).send(err.message));
};
  
module.exports = {
    getIngredients,
    addIngredient,
    updateIngredient,
    deleteIngredient
};
