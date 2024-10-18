import { getRecipes } from "./api/api.js"
import { debounce } from "./lib/debounce.js"
import { searchRecipes, filterInputsearchNative, filterInputsearchFunctional } from "./lib/filters.js"
import { displayCards } from "./components/displayCards.js"
import { searchBarInput } from "./components/searchBar.js"
import { initialiseDropdowns, updateDropdowns } from "./components/dropdownTag.js"
import { suggestRecipes } from "./components/suggestRecipes.js"
import { pushDropdownData } from "./components/dropdownData.js"

/*********** Initiation ***********/

// To build the recipes count
const updateRecipesCount = (count) => {
    const recipeCountElement = document.querySelector(".recipes-count")
    recipeCountElement.textContent = `${count} recettes`
}

window.onload = async () => {
    const { recipes } = await getRecipes()

    // To declare the dropdowns lists
    const ingredients = []
    const appliances = []
    const utensils = []

    // To define the dropdowns lists and to push the data
    pushDropdownData(recipes, ingredients, appliances, utensils)

    const filterAndDisplayRecipes = () => {
        const filterMapFrEn = new Map([
            ["ingrédients", "ingredient"],
            ["appareils", "appliance"],
            ["ustensiles", "utensil"]
        ])

        // To get the input value and convert it to lowercase to facilitate comparison
        let filterInput = document.querySelector(".inputSearchBarHeader").value.toLowerCase()

        // To create a list of the selected tags. Language conversion with filterMapFrEn
        const tagsList = [...document.querySelectorAll(".selected_tag")].map(element => {
            const tagName = filterMapFrEn.get(element.getAttribute("data-filter").toLowerCase())
            const tagValue = element.querySelector(".selected_tag_name").textContent.toLowerCase()
            return { name: tagName, value: tagValue }
        })

        // To filter the list of recipes (stored in "recipes") based on the value of the input and the list of the selected tags
        const filtered = searchRecipes(recipes, filterInput, tagsList)
        const pagination = document.querySelector(".recipes-pagination")
        
        const handleClickTag = (value) => {
            inputSearchBarHeader.value = value
            inputSearchBarHeader.dispatchEvent(new Event("input"))
            filterAndDisplayRecipes()
        }

        // To display the filtered recipes
        if (filtered.length > 0) {
            displayCards(filtered)
            pagination.style.display = "flex"
        } else {
            // To display the no result message
            suggestRecipes(handleClickTag, tagsList, filterInput, pagination, filterAndDisplayRecipes)
        }

        // To update the count with the filtered recipes
        updateRecipesCount(filtered.length)

        // To update the dropdowns with the filtered recipes => doesn't work for now
        updateDropdowns(filtered, debounceSearchRecipes)
    }

    // To debounce the filter system
    const debounceSearchRecipes = debounce(filterAndDisplayRecipes, -1)

    // Header's search bar input: to clear the text (by clicking on the delete btn) and to add the debounce event
    const setupSearchBar = (inputElement, deleteButton) => {
        searchBarInput(inputElement, deleteButton)
        inputElement.addEventListener("input", debounceSearchRecipes)
    }
    
    // To configure the search bar
    const inputSearchBarHeader = document.querySelector(".inputSearchBarHeader")
    setupSearchBar(inputSearchBarHeader, document.querySelector(".button_delete_input_text_header"))

    // To build the dropdown filters
    const filtersContainer = document.querySelector(".filter_container")
    
    const dropdowns = [
        { 
            name: "Ingrédients", 
            id: "dropdown_ingredients", 
            tagList: ingredients 
        }, { 
            name: "Appareils", 
            id: "dropdown_appliances", 
            tagList: appliances 
        }, { 
            name: "Ustensiles", 
            id: "dropdown_utensils", 
            tagList: utensils 
        }
    ]

    initialiseDropdowns(dropdowns, filtersContainer, debounceSearchRecipes)

    // To update the recipes count and to display the recipes cards (items per page: 9)
    updateRecipesCount(recipes.length)
    displayCards(recipes, 1, 9)
        
    

    /*********** Testing native loops and Functional Programming performances ***********/

    const measurePerformance = (filterFunction, list, value) => {
        console.time("Performance Test")
        const result = filterFunction(list, value)
        console.timeEnd("Performance Test")
        return result
    }

    // Exemple (to try with multiple elements)
    const filterValue = "oeuf"

    // Native loops performance
    console.log("Testing Native Loops:")
    measurePerformance(filterInputsearchNative, recipes, filterValue)

    // Functional programming performance
    console.log('Testing Functional Programming:')
    measurePerformance(filterInputsearchFunctional, recipes, filterValue)
}
