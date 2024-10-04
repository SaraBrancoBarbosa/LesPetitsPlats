import { getRecipeCardDOM } from "./templates/indexCard.js"
import { getRecipes } from "./api/api.js"
import { searchRecipes } from "./components/searchBars.js"
import { enableClearInputText } from "./components/searchBars.js"
import { debounce } from "./components/debounce.js"
import { initDropDown } from "./components/dropdown.js"
import { DropdownTag } from "./components/dropdownTag.js"

// Pour "débouncer" searchRecipes, 350ms de délai
const debouncedSearchRecipes = debounce(searchRecipes, 500)

/*********** Displaying the recipes cards ***********/

// Pour mettre à jour le compteur de recettes (aussi exportée dans la searchBar pour le moment)
export function updateRecipesCount(count) {
    const recipeCountElement = document.querySelector(".recipes-count")
    recipeCountElement.textContent = `${count} recettes`
}

// To display the recipes cards
async function displayData(recipes, page=0, itemsPerPage=-1) {
    const recipiesMainContainer = document.querySelector(".recipes-main-container")
    
    // Si je limite à 10, toutes les recettes ne sont pas prises en compte lors de la recherche...
    const limitedDisplayRecipes = itemsPerPage > 0 ? recipes.slice(page * itemsPerPage, (page + 1) * itemsPerPage) : recipes

    limitedDisplayRecipes.forEach((recipe) => {
        const recipeCardDOM = getRecipeCardDOM(recipe)
        recipiesMainContainer.appendChild(recipeCardDOM)
    });

    // Pour mettre à jour le compteur avec le nombre de recettes affichées (sinon ça affiche 1500 au début, et ça prend le nombre correct une fois les recherches lancées seulement)
    updateRecipesCount(recipes.length)
}

/*********** Initiation ***********/

// Fonction 3 : Main search bar, puis tags, puis affichage
async function init() {
    const { recipes } = await getRecipes()

    // AddEventListener sur la barre de recherche (l'input)
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