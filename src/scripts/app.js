import { getRecipeCardDOM } from "./templates/indexCard.js"
import { getRecipes } from "./api/api.js"
import { searchRecipes } from "./components/searchBars.js"
import { enableClearInputText } from "./components/searchBars.js"
import { debounce } from "./components/debounce.js"
import { initDropDown } from "./components/dropdown.js"
import { DropdownTag } from "./components/dropdownTag.js"

/*********** Displaying the recipes cards ***********/

// To display the recipes cards
async function displayData(recipes) {
    const recipiesMainContainer = document.querySelector(".recipes-main-container")

    // Si je limite à 10, toutes les recettes ne sont pas prises en compte lors de la recherche...
    const limitedDisplayRecipes = recipes.slice(0, 50)

    limitedDisplayRecipes.forEach((recipe) => {
        const recipeCardDOM = getRecipeCardDOM(recipe)
        recipiesMainContainer.appendChild(recipeCardDOM)
    });
}

/*********** Initiation ***********/

// Fonction 3 : Main search bar, puis tags, puis affichage
async function init() {
    const { recipes } = await getRecipes()


// Pour "débouncer" searchRecipes, 350ms de délai
const debouncedSearchRecipes = debounce(searchRecipes, 350)

// Ajoutez un écouteur d'événements sur la barre de recherche
document.querySelector(".inputSearchBarHeader").addEventListener("input", debouncedSearchRecipes)


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
            appliances.push(recipe.appliance)
    })

    const utensils = []
    recipes.forEach(recipe => {
        recipe.ustensils.forEach(utensil => {
        const lowerUtensils = utensil.toLowerCase()
        if (!utensils.find(ust => lowerUtensils === ust.toLowerCase()))
            utensils.push(utensil)
        });
    });

    // Build the filters
    const filtersContainer = document.querySelector(".filter_container")
    initDropDown()
    const ingredientsFilters = new DropdownTag({name:"Ingrédients", id:"dropdown_ingredients", parent:filtersContainer, tagList:ingredients})
    const appliancesFilters = new DropdownTag({name:"Appareils", id:"dropdown_appliances", parent:filtersContainer, tagList:appliances})
    const utensilsFilters = new DropdownTag({name:"Ustensiles", id:"dropdown_utensils", parent:filtersContainer, tagList:utensils})

    // Update les résultats
    ingredientsFilters.update(["Lait de coco"])

    // Call the function to clear the header's input text
    enableClearInputText(document.querySelector(".inputSearchBarHeader"), document.querySelector(".buttonSearchBarHeader"))

    displayData(recipes)
}

window.onload = () => {
    init()
}