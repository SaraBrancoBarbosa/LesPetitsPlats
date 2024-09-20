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
        recipe.ingredients.forEach(ingredient => {
            if (!ingredients.includes(ingredient.ingredient)) {
                ingredients.push(ingredient.ingredient)
            }
        })
    })

    /* Build the filters */
    const filtersContainer = document.querySelector(".filter_container")
    initDropDown
    dropdownTag("Ingrédients", "dropdown_ingredients", filtersContainer, ingredients)
    dropdownTag("Appareils", "dropdown_appliance", filtersContainer, ["hello", "world"])
    dropdownTag("Ustensiles", "dropdown_utensils", filtersContainer, ["hello", "world"])

    // Call the function to clear the header's input text
    enableClearInputText(document.querySelector(".inputSearchBarHeader"), document.querySelector(".buttonSearchBarHeader"))

    displayData(recipes);
}

window.onload = () => {
    init()
}