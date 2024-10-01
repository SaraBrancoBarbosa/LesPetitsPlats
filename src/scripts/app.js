//End point to run the application
import { getRecipeCardDOM } from "./templates/indexCard.js";
import { getRecipes } from "./api/api.js";
import { enableClearInputText } from "./components/searchBars.js";
import { initDropDown } from "./components/dropdown.js";
import { dropdownTag } from "./components/dropdownTag.js";
//import { debounce } from "./components/debounce.js";

/*********** Search recipes - main search bar ***********/

// Fonction 1 : la main search bar (est-ce que je la mets dans le fichier searchBars.js ?)
function searchRecipes() {
    let filterInput = document.querySelector(".inputSearchBarHeader").value
    filterInput = filterInput.toLowerCase()
    
    const recipiesContainer = document.querySelector(".recipes-main-container");
    const recipes = recipiesContainer.querySelectorAll(".card")

    recipes.forEach(recipe => {
        const recipeName = recipe.querySelector(".card_content_title").textContent.toLowerCase()
        const recipeDescription = recipe.querySelector(".card_content_text_recipe").textContent.toLowerCase();
        const ingredients = Array.from(recipe.querySelectorAll(".font-medium")).map(ingredient => ingredient.textContent.toLowerCase()); // Assurez-vous d'avoir une classe pour les ingrédients
        
        // Vérifiez si le filtre est présent dans le nom, la description ou les ingrédients
        const isMatch = recipeName.includes(filterInput) ||
        recipeDescription.includes(filterInput) ||
        ingredients.some(ingredient => ingredient.includes(filterInput));
        
        // Affiche ou masque la recette en fonction du résultat
        recipe.style.display = isMatch ? "flex" : "none";
        });
}

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

// Fonction 3
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
    const ingredientsFilters = new dropdownTag({name:"Ingrédients", id:"dropdown_ingredients", parent:filtersContainer, tagList:ingredients})
    const appliancesFilters = new dropdownTag({name:"Appareils", id:"dropdown_appliances", parent:filtersContainer, tagList:appliances})
    const utensilsFilters = new dropdownTag({name:"Ustensiles", id:"dropdown_utensils", parent:filtersContainer, tagList:utensils})

    ingredientsFilters.update(["Lait de coco"])

    // Call the function to clear the header's input text
    enableClearInputText(document.querySelector(".inputSearchBarHeader"), document.querySelector(".buttonSearchBarHeader"))

    displayData(recipes);
    searchRecipes()
}

window.onload = () => {
    init()
}