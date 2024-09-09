//End point to run the application
import { getRecipeCardDOM } from "./templates/index.js";
import { getRecipes } from "./api/api.js";

// Main search bar: delete the text by clicking on the button
let inputSearchBar = document.querySelector('.inputSearchBar') 
  
inputSearchBar.addEventListener('input', function() { 
    document.querySelector('.buttonSearchBar').style.cssText = "display: flex; duration: 500ms";
}); 
// Ajouter : quand on clique sur la croix, ça supprime le texte
// Ajouter : quand on efface le texte, la croix disparait
// Ajouter : animation smooth (ça marche pô lô)



// To get the json datas
getRecipes()

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