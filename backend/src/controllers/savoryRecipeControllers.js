const { v4: uuidv4 } = require('uuid');
const { validateDataSavoryRecipes } = require('../models/savoryRecipeSchema');

const fs = require('fs');

function getSavoryRecipesPromise() {
    return new Promise((resolve, reject) => {
        fs.readFile('src/models/data/savoryRecipes.json', 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                let savoryRecipes = JSON.parse(data);
                resolve(savoryRecipes);
            }
        });
    });
}

const getSavoryRecipes = (req, res) => {
    getSavoryRecipesPromise()
        .then((savoryRecipes) => res.status(200).json(savoryRecipes))
        .catch((err) => res.status(500).send(err.message));
};

function addSavoryRecipePromise(savoryRecipe) {
    return new Promise((resolve, reject) => {
        fs.readFile('src/models/data/savoryRecipes.json', 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                let savoryRecipes = JSON.parse(data);

                const id = uuidv4();
                const savoryRecipeNew = { id, ...savoryRecipe };

                savoryRecipes.push(savoryRecipeNew);

                fs.writeFile('src/models/data/savoryRecipes.json', JSON.stringify(savoryRecipes), (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(savoryRecipeNew);
                    }
                });
            }
        });
    });
}

const addSavoryRecipe = (req, res) => {
    const savoryRecipe = req.body;

    const validResult = validateDataSavoryRecipes(savoryRecipe);

    if (!validResult.valid) {
        return res.status(400).json({ message: 'Invalid savoryRecipe Data', errors: validResult.errors });
    }

    addSavoryRecipePromise(savoryRecipe)
        .then((savoryRecipeNew) => res.status(200).json(savoryRecipeNew))
        .catch((err) => res.status(500).send(err.message));
};


function updateSavoryRecipePromise(id, savoryRecipe) {
    return new Promise((resolve, reject) => {
        fs.readFile('src/models/data/savoryRecipes.json', 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                let savoryRecipes = JSON.parse(data);
                const index = savoryRecipes.findIndex((i) => i.id === id);

                if (index === -1) {
                    reject(new Error('savoryRecipe not found'));
                } else {
                    const savoryRecipeUpdated = { id, ...savoryRecipe };
                    savoryRecipes[index] = savoryRecipeUpdated;

                    fs.writeFile('src/models/data/savoryRecipes.json', JSON.stringify(savoryRecipes), (err) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(savoryRecipeUpdated);
                        }
                    });
                }
            }
        });
    });
}

const updateSavoryRecipe = (req, res) => {
    const id = req.params.id;
    const savoryRecipe = req.body;

    updateSavoryRecipePromise(id, savoryRecipe)
        .then((savoryRecipeUpdated) => res.status(200).json(savoryRecipeUpdated))
        .catch((err) => res.status(500).send(err.message));
};

function deleteSavoryRecipePromise(id) {
    return new Promise((resolve, reject) => {
        fs.readFile('src/models/data/savoryRecipes.json', 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                let savoryRecipes = JSON.parse(data);
                const index = savoryRecipes.findIndex((i) => i.id === id);

                if (index === -1) {
                    reject(new Error('savoryRecipe not found'));
                } else {
                    savoryRecipes.splice(index, 1);

                    fs.writeFile('src/models/data/savoryRecipes.json', JSON.stringify(savoryRecipes), (err) => {
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

const deleteSavoryRecipe = (req, res) => {
    const id = req.params.id;

    deleteSavoryRecipePromise(id)
        .then(() => res.status(200).json({ message: 'savoryRecipe Deleted' }))
        .catch((err) => res.status(500).send(err.message));
};

module.exports = {
    getSavoryRecipes,
    addSavoryRecipe,
    updateSavoryRecipe,
    deleteSavoryRecipe
};
