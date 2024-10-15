import { getRecipes } from "./api/api.js"
import { debounce } from "./lib/debounce.js"
import { searchRecipes, filterInputsearchNative, filterInputsearchFunctional } from "./lib/filters.js"
import { displayCards } from "./components/displayCards.js"
import { searchBarInput } from "./components/searchBar.js"
import { initClickAwayDropdown } from "./components/dropdown.js"
import { DropdownTag, updateDropdowns } from "./components/dropdownTag.js"
import { addSelectedTag } from "./components/selectedTagList.js"
import { suggestRecipes } from "./components/suggestRecipes.js"

/*********** Initiation ***********/

// To build the recipes count
const updateRecipesCount = (count) => {
    const recipeCountElement = document.querySelector(".recipes-count")
    recipeCountElement.textContent = `${count} recettes`
}

window.onload = async () => {
    const { recipes } = await getRecipes()

    const ingredients = []
    const appliances = []
    const utensils = []
    
    // For each recipe: to go through the ingredients/appliances/utensils and add them to their list. toLowerCase(): to facilitate comparison and avoid duplicates
    recipes.forEach(recipe => {
        recipe.ingredients.forEach(({ingredient}) => {
            const lowerIngredient = ingredient.toLowerCase()
            if (!ingredients.find(ing => lowerIngredient === ing.toLowerCase()))
                ingredients.push(ingredient)
        })
    })

    recipes.forEach(recipe => {
        const lowerAppliance = recipe.appliance.toLowerCase()
        if (!appliances.find(app => lowerAppliance === app.toLowerCase()))
            appliances.push(recipe.appliance)
    })

    recipes.forEach(recipe => {
        recipe.utensils.forEach(utensil => {
        const lowerUtensils = utensil.toLowerCase()
        if (!utensils.find(ust => lowerUtensils === ust.toLowerCase()))
            utensils.push(utensil)
        })
    })

    const filterAndDisplayRecipes = () => {
        const filterMapFrEn = new Map([
            ["ingrédients", "ingredient"],
            ["appareils", "appliance"],
            ["ustensiles", "utensil"]
        ])

        // To get the input value and convert it to lowercase to facilitate comparison
        let filterInput = document.querySelector(".inputSearchBarHeader").value
        filterInput = filterInput.toLowerCase()

        // To create a list of the selected tags. Language conversion with filterMapFrEn
        const tagsList = [...document.querySelectorAll(".selected_tag")].map(element => {
            const tagName = filterMapFrEn.get(element.getAttribute("data-filter").toLowerCase())
            const tagValue = element.querySelector(".selected_tag_name").textContent.toLowerCase()
            return { name: tagName, value: tagValue }
        })

        // To filter the list of recipes (stored in "recipes") based on the value of the input and the list of the selected tags
        const filtered = searchRecipes(recipes, filterInput, tagsList)
        const pagination = document.querySelector(".recipes-pagination")
        
        // To display the filtered recipes
        if (filtered.length > 0) {
            displayCards(filtered)
            pagination.style.display = "flex"
        } else {
            // To display the no result message
            suggestRecipes(inputSearchBarHeader, filterAndDisplayRecipes, tagsList, filterInput, pagination)
        }

        // To update the count with the filtered recipes
        updateRecipesCount(filtered.length)

        updateDropdowns(filtered)
    }

    // To debounce the filter system
    const debounceSearchRecipes = debounce(filterAndDisplayRecipes, -1)

    // To build the filters
    const filtersContainer = document.querySelector(".filter_container")
    initClickAwayDropdown()

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
        
    dropdowns.forEach(({ name, id, tagList }) => {
        new DropdownTag({
            name,
            id,
            parent: filtersContainer,
            tagList,
            onclickTag: (...args) => { addSelectedTag(debounceSearchRecipes, ...args) }
        })
    })

    /**
     * onclickTag: this line allows to manage the tag selection logic and to perform a search based on the selected tags
     * (...args): rest parameters, to accept an indefinite number of arguments as an array
     * addSelectedTag called with 2 arguments: the debounce and the spread operator (all arguments passed to onclickTag will be passed to addSelectedTag)
    */

    // Header's search bar input: to clear the text (by clicking on the delete btn) and to add the debounce event
    const inputSearchBarHeader = document.querySelector(".inputSearchBarHeader")
    searchBarInput(inputSearchBarHeader, document.querySelector(".button_delete_input_text_header"))
    inputSearchBarHeader.addEventListener("input", debounceSearchRecipes)
    
    updateRecipesCount(recipes.length)

    // To display the recipes cards (items per page: 9)
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
