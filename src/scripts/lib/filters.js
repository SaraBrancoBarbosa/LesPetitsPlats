
/*********** Search recipes - filters ***********/

/*
Func 3 =

    recipes
       |
       |
       v
    Func1 -> name || ingredients || description
       |
       |
       v
    Func2 -> tags
       |
       |
       v
 filtered recipes

*/

// Func 3
export function searchRecipes(list, value, tagsList) {
    const inNameOrIngredientsOrDescription = filterInputsearch(list, value)
    const inTags = filterTags(inNameOrIngredientsOrDescription, tagsList)

    return inTags
}

// Func 1
// Native loops
export const filterInputsearch = (list, value) => {
    // Below 3 characters, the entire list is returned
    if (value.length < 3) { return [...list] }

    const result = []
    
    for (let recipe of list) {
        const name = recipe.name.toLowerCase()
        const ingredients = []
        for (let ingredient of recipe.ingredients) {
            ingredients.push(ingredient.ingredient.toLowerCase())
        }
        const description = recipe.description.toLowerCase()

        // Filters name OR ingredients OR description
        if (name.includes(value) || ingredients.some(ingredient => ingredient.includes(value)) || description.includes(value)) 
            result.push(recipe)
    }
    return result
}

/*
// Func 1
// Functional programming
export const filterInputsearch = (list, value) => {
    // Below 3 characters, the entire list is returned
    if (value.length < 3) { return [...list] }

    return list.filter(recipe => {
        const name = recipe.name.toLowerCase()
        const ingredients = recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase())
        const description = recipe.description.toLowerCase()

        // Filters name OR ingredients OR description
        return name.includes(value) || ingredients.some(ingredient => ingredient.includes(value)) || description.includes(value)
    })
}
*/

// Func 2
const filterTags = (list, tagsList) => {
    
    // On crée un nouveau tableau avec les recettes qui passent le filtrage
    return list.filter(
        recipe => {
            const ingredients = recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase())
            const appliance = recipe.appliance.toLowerCase()
            const utensils = recipe.utensils.map(utensil => utensil.toLowerCase())
        
            // every() permet de tester si tous les éléments d'un tableau vérifient une condition donnée par une fonction en argument. Cette méthode renvoie un booléen pour le résultat du test.
            return tagsList.every(tag => {
                if (tag.name === "ingredient") {
                    return ingredients.find(ing => ing === tag.value)
                } else if (tag.name === "appliance") {
                    return appliance === tag.value
                } else if (tag.name === "utensil") {
                    return utensils.find(utensil => utensil === tag.value)
                } // Si le tag ne correspond pas, on retourne false
                    return false
            })
        }
    )
}

