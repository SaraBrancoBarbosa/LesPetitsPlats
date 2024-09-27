//End point to run the application
import { getRecipeCardDOM } from "./templates/indexCard.js";
import { getRecipes } from "./api/api.js";
import { enableClearInputText } from "./components/searchBars.js";
import { initDropDown } from "./components/dropdown.js";
import { dropdownTag } from "./components/dropdownTag.js";

/*********** Displaying the recipes cards ***********/

// To display the recipes cards
async function displayData(recipes) {
    const recipiesMainContainer = document.querySelector(".recipes-main-container");

    // Limitation to 10 recipes
    const limitedDisplayRecipes = recipes.slice(0, 10);

    limitedDisplayRecipes.forEach((recipe) => {
        const recipeCardDOM = getRecipeCardDOM(recipe);
        recipiesMainContainer.appendChild(recipeCardDOM);
    });

}

/*********** Initiation ***********/

async function init() {
    const { recipes } = await getRecipes();

    const ingredients = []
    recipes.forEach(recipe => {
        recipe.ingredients.forEach(({ingredient}) => {
            const lowerIngredient = ingredient.toLowerCase()
            if (!ingredients.find(ing => lowerIngredient === ing.toLowerCase()))
                ingredients.push(ingredient)
        })
    })

    const appliances = []
    recipes.forEach(recipe => {
        const lowerAppliance = recipe.appliance.toLowerCase()
        if (!appliances.find(app => lowerAppliance === app.toLowerCase()))
            appliances.push(recipe.appliance);
    })

    const utensils = []
    recipes.forEach(recipe => {
        recipe.ustensils.forEach(utensil => {
        const lowerUtensils = utensil.toLowerCase()
        if (!utensils.find(ust => lowerUtensils === ust.toLowerCase()))
            utensils.push(utensil);
        });
    });

    // Build the filters
    const filtersContainer = document.querySelector(".filter_container")
    initDropDown()
    dropdownTag({name:"Ingrédients", id:"dropdown_ingredients", parent:filtersContainer, tagList:ingredients})
    dropdownTag({name:"Appareils", id:"dropdown_appliances", parent:filtersContainer, tagList:appliances})
    dropdownTag({name:"Ustensiles", id:"dropdown_utensils", parent:filtersContainer, tagList:utensils})

    // Call the function to clear the header's input text
    enableClearInputText(document.querySelector(".inputSearchBarHeader"), document.querySelector(".buttonSearchBarHeader"))

    displayData(recipes);
}

window.onload = () => {
    init()
}