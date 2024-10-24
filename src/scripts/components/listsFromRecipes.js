/*********** For each recipe: to go through the ingredients/appliances/utensils and to generate the lists ***********/

export const generateListsFromRecipes = (recipes, ingredients, appliances, utensils, currentTags) => {
    const currentIngredients = currentTags.filter(t => t.name === "ingredient").map(t => t.value)
    const currentAppliance = currentTags.filter(t => t.name === "appliance").map(t => t.value)
    const currentUtensils = currentTags.filter(t => t.name === "utensil").map(t => t.value)
    
    recipes.forEach(recipe => {
        recipe.ingredients.forEach(({ingredient}) => {
            const lowerIngredient = ingredient.toLowerCase()
            if (!currentIngredients.find(t => t===lowerIngredient) &&
                !ingredients.find(ing => lowerIngredient === ing.toLowerCase())
            )
                ingredients.push(ingredient)
        })
    })

    recipes.forEach(recipe => {
        const lowerAppliance = recipe.appliance.toLowerCase()
        if (!currentAppliance.find(t => t===lowerAppliance) &&
            !appliances.find(app => lowerAppliance === app.toLowerCase()))
            appliances.push(recipe.appliance)
    })

    recipes.forEach(recipe => {
        recipe.utensils.forEach(utensil => {
        const lowerUtensils = utensil.toLowerCase()
        if (!currentUtensils.find(t => t===lowerUtensils) &&
            !utensils.find(ust => lowerUtensils === ust.toLowerCase()))
            utensils.push(utensil)
        })
    })
}