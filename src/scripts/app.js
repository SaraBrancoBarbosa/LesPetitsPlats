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

    // new Set() pour éviter les doublons
    const ingredients = new Set()
    recipes.forEach(recipe => {
        recipe.ingredients.forEach(ingredient => {
            // Convertit l'ingrédient en minuscules avant de l'ajouter au set (puis re-maj avec Tailwind)
            ingredients.add(ingredient.ingredient.toLowerCase());
        })
    })
    // Convertit le set en tableau
    const noDuplicationIngredients = Array.from(ingredients);

    const appliance = new Set()
    recipes.forEach(recipe => {
        appliance.add(recipe.appliance.toLowerCase());
    })
    const noDuplicationAppliances = Array.from(appliance);

    const ustensils = new Set();
    recipes.forEach(recipe => {
        recipe.ustensils.forEach(ustensil => {
            ustensils.add(ustensil.toLowerCase());
        });
    });
    const noDuplicationUstensils = Array.from(ustensils);

    // Build the filters
    const filtersContainer = document.querySelector(".filter_container")
    initDropDown()
    dropdownTag("Ingrédients", "dropdown_ingredients", filtersContainer, noDuplicationIngredients)
    dropdownTag("Appareils", "dropdown_appliance", filtersContainer, noDuplicationAppliances)
    dropdownTag("Ustensiles", "dropdown_ustensils", filtersContainer, noDuplicationUstensils)

    // Call the function to clear the header's input text
    enableClearInputText(document.querySelector(".inputSearchBarHeader"), document.querySelector(".buttonSearchBarHeader"))

    displayData(recipes);
}

window.onload = () => {
    init()
}