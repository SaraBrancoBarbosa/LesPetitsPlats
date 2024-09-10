//End point to run the application
import { getRecipeCardDOM } from "./templates/index.js";
import { getRecipes } from "./api/api.js";
import { deleteTextButton } from "./components/headerSearchBar.js";

// Call the header search bar function to delete the text
deleteTextButton();

// To get the json datas
getRecipes();

// To display the recipes cards
async function displayData(recipes) {
    const recipiesMainContainer = document.querySelector(".recipes-main-container");

    recipes.forEach((recipe) => {
        const recipeCardDOM = getRecipeCardDOM(recipe);
        recipiesMainContainer.appendChild(recipeCardDOM);  
    });
}

async function init() {
    const { recipes } = await getRecipes();
    displayData(recipes);
}

window.onload = () => {
    init()
}