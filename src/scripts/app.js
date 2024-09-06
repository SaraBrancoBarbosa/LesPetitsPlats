//End point to run the application
import { getRecipeCardDOM } from "./templates/index.js";

// Main search bar: delete the text by clicking on the button
let inputSearchBar = document.querySelector('.inputSearchBar') 
  
inputSearchBar.addEventListener('input', function() { 
    document.querySelector('.buttonSearchBar').style.cssText = "display: flex; duration: 500ms";
}); 
// Ajouter : quand on clique sur la croix, ça supprime le texte
// Ajouter : quand on efface le texte, la croix disparait
// Ajouter : animation smooth (ça marche pô lô)

// To get the json datas
async function getRecipes() {
    
    const database = await fetch("public/data/recipes.json")
    .then(response => response.json());    
    
    return (
        {
        recipes: database.recipes
        }
    )
}

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

// Pour comprendre le système de try et catch
/*
async function getRecipes() {
    const jsonFile = "/public/data/recipes.json";
    try {
        const database = await fetch(jsonFile);
        if (!database.ok) {
            throw new Error(`database status: ${database.status}`);
        }

        const json = await database.json();
        console.log(json);
    } catch (error) {
        if ("message" in error)
            console.error(error.message) 
        else console.error(error)
    } 
    return (
        {
        recipes: database.recipes
        }
    )
}
*/