const { v4: uuidv4 } = require('uuid');
const { validateDataSweetRecipes } = require('../models/sweetRecipeSchema');

const fs = require('fs');

function getSweetRecipesPromise() {
    return new Promise((resolve, reject) => {
        fs.readFile('src/models/data/sweetRecipes.json', 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                let sweetRecipes = JSON.parse(data);
                resolve(sweetRecipes);
            }
        });
    });
}

const getSweetRecipes = (req, res) => {
    getSweetRecipesPromise()
        .then((sweetRecipes) => res.status(200).json(sweetRecipes))
        .catch((err) => res.status(500).send(err.message));
};

function addSweetRecipePromise(sweetRecipe) {
    return new Promise((resolve, reject) => {
        fs.readFile('src/models/data/sweetRecipes.json', 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                let sweetRecipes = JSON.parse(data);

                const id = uuidv4();
                const sweetRecipeNew = { id, ...sweetRecipe };

                sweetRecipes.push(sweetRecipeNew);

                fs.writeFile('src/models/data/sweetRecipes.json', JSON.stringify(sweetRecipes), (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(sweetRecipeNew);
                    }
                });
            }
        });
    });
}

const addSweetRecipe = (req, res) => {
    const sweetRecipe = req.body;

    const validResult = validateDataSweetRecipes(sweetRecipe);

    if (!validResult.valid) {
        return res.status(400).json({ message: 'Invalid sweetRecipe Data', errors: validResult.errors });
    }

    addSweetRecipePromise(sweetRecipe)
        .then((sweetRecipeNew) => res.status(200).json(sweetRecipeNew))
        .catch((err) => res.status(500).send(err.message));
};


function updateSweetRecipePromise(id, sweetRecipe) {
    return new Promise((resolve, reject) => {
        fs.readFile('src/models/data/sweetRecipes.json', 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                let sweetRecipes = JSON.parse(data);
                const index = sweetRecipes.findIndex((i) => i.id === id);

                if (index === -1) {
                    reject(new Error('sweetRecipe not found'));
                } else {
                    const sweetRecipeUpdated = { id, ...sweetRecipe };
                    sweetRecipes[index] = sweetRecipeUpdated;

                    fs.writeFile('src/models/data/sweetRecipes.json', JSON.stringify(sweetRecipes), (err) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(sweetRecipeUpdated);
                        }
                    });
                }
            }
        });
    });
}

const updateSweetRecipe = (req, res) => {
    const id = req.params.id;
    const sweetRecipe = req.body;

    updateSweetRecipePromise(id, sweetRecipe)
        .then((sweetRecipeUpdated) => res.status(200).json(sweetRecipeUpdated))
        .catch((err) => res.status(500).send(err.message));
};

function deleteSweetRecipePromise(id) {
    return new Promise((resolve, reject) => {
        fs.readFile('src/models/data/sweetRecipes.json', 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                let sweetRecipes = JSON.parse(data);
                const index = sweetRecipes.findIndex((i) => i.id === id);

                if (index === -1) {
                    reject(new Error('sweetRecipe not found'));
                } else {
                    sweetRecipes.splice(index, 1);

                    fs.writeFile('src/models/data/sweetRecipes.json', JSON.stringify(sweetRecipes), (err) => {
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

const deleteSweetRecipe = (req, res) => {
    const id = req.params.id;

    deleteSweetRecipePromise(id)
        .then(() => res.status(200).json({ message: 'sweetRecipe Deleted' }))
        .catch((err) => res.status(500).send(err.message));
};

module.exports = {
    getSweetRecipes,
    addSweetRecipe,
    updateSweetRecipe,
    deleteSweetRecipe
};