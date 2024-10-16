/*********** For each recipe: to go through the ingredients/appliances/utensils and add them to the dropdowns lists ***********/

export const pushDropdownData = (recipes, ingredients, appliances, utensils) => {
    
    recipes.forEach(recipe => {
        recipe.ingredients.forEach(({ingredient}) => {
            const lowerIngredient = ingredient.toLowerCase()
            if (!ingredients.find(ing => lowerIngredient === ing.toLowerCase()))
                ingredients.push(ingredient)
        })
    })

    recipes.forEach(recipe => {
        const lowerAppliance = recipe.appliance.toLowerCase()
        if (!appliances.find(app => lowerAppliance === app.toLowerCase()))
            appliances.push(recipe.appliance)
    })

    recipes.forEach(recipe => {
        recipe.utensils.forEach(utensil => {
        const lowerUtensils = utensil.toLowerCase()
        if (!utensils.find(ust => lowerUtensils === ust.toLowerCase()))
            utensils.push(utensil)
        })
    })
}