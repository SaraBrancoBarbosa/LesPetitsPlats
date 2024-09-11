//End point to run the application
import { getRecipeCardDOM } from "./templates/indexCard.js";
import { getRecipes } from "./api/api.js";
import { deleteTextButtonHeader, deleteTextButtonFilter } from "./components/searchBars.js";
import { filterDropDown } from "./components/dropdown.js";

// Call the header search bar function to delete the text
deleteTextButtonHeader();

// Call the filter search bar function to delete the text
deleteTextButtonFilter();

// To get the json datas
getRecipes();

// To display the recipes cards
async function displayData(recipes) {
    const recipiesMainContainer = document.querySelector(".recipes-main-container");

    recipes.forEach((recipe) => {
        const recipeCardDOM = getRecipeCardDOM(recipe);
        recipiesMainContainer.appendChild(recipeCardDOM);  
    });

    // Call the filters dropdown function
    filterDropDown();
}

async function init() {
    const { recipes } = await getRecipes();
    displayData(recipes);
}

window.onload = () => {
    init()
}