//End point to run the application
import { getRecipeCardDOM } from "./templates/indexCard.js";
import { getRecipes } from "./api/api.js";
import { deleteTextButtonHeader, deleteTextButtonFilter } from "./components/searchBars.js";
import { filterDropDown } from "./components/dropdown.js";

/*********** Calling the json datas and the search bar functions (header + filter) ***********/

// Call the header search bar function to delete the text
deleteTextButtonHeader();

// Call the filter search bar function to delete the text
deleteTextButtonFilter();

// To get the json datas
getRecipes();

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

    /*
    recipes.forEach((recipe) => {
        const recipeCardDOM = getRecipeCardDOM(recipe);
        recipiesMainContainer.appendChild(recipeCardDOM);  
    });
    */
    
    // Call the filters dropdown function
    filterDropDown();
}

/*********** Initiation ***********/

async function init() {
    const { recipes } = await getRecipes();
    displayData(recipes);
}

window.onload = () => {
    init()
}