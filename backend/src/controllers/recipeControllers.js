const fs = require('fs');

function getRecipesPromise(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                const recipes = JSON.parse(data);
                resolve(recipes);
            }
        });
    });
}

const getRecipes = (req, res) => {
    const savoryRecipesPromise = getRecipesPromise('src/models/data/savoryRecipes.json');
    const sweetRecipesPromise = getRecipesPromise('src/models/data/sweetRecipes.json');

    Promise.all([savoryRecipesPromise, sweetRecipesPromise])
        .then(([savoryRecipes, sweetRecipes]) => {
            const recipes = [...savoryRecipes, ...sweetRecipes];
            res.status(200).json(recipes);
        })
        .catch((err) => res.status(500).send(err.message));
};

function updateRecipePromise(filePath, id, recipe) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                let recipes = JSON.parse(data);
                const index = recipes.findIndex((i) => i.id === id);

                if (index === -1) {
                    reject(new Error('Recipe not found'));
                } else {
                    const updatedRecipe = { id, ...recipe };
                    recipes[index] = updatedRecipe;

                    fs.writeFile(filePath, JSON.stringify(recipes), (err) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(updatedRecipe);
                        }
                    });
                }
            }
        });
    });
}

const updateRecipe = (req, res) => {
    const filePath = req.params.recipeType === 'savory' ? 'src/models/data/savoryRecipes.json' : 'src/models/data/sweetRecipes.json';
    const id = req.params.id;
    const recipe = req.body;

    updateRecipePromise(filePath, id, recipe)
        .then((updatedRecipe) => res.status(200).json(updatedRecipe))
        .catch((err) => res.status(500).send(err.message));
};

function deleteRecipePromise(filePath, id) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                let recipes = JSON.parse(data);
                const index = recipes.findIndex((i) => i.id === id);

                if (index === -1) {
                    reject(new Error('Recipe not found'));
                } else {
                    recipes.splice(index, 1);

                    fs.writeFile(filePath, JSON.stringify(recipes), (err) => {
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

const deleteRecipe = (req, res) => {
    const filePath = req.params.recipeType === 'savory' ? 'src/models/data/savoryRecipes.json' : 'src/models/data/sweetRecipes.json';
    const id = req.params.id;

    deleteRecipePromise(filePath, id)
        .then(() => res.status(200).json({ message: 'Recipe Deleted' }))
        .catch((err) => res.status(500).send(err.message));
};

module.exports = {
    getRecipes,
    updateRecipe,
    deleteRecipe
};
