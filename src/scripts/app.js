import { getRecipes } from "./api/api.js"
import { debounce } from "./lib/debounce.js"
import { searchRecipes } from "./lib/filters.js"
import { displayCards } from "./components/displayCards.js"
import { searchBarInput } from "./components/searchBar.js"
import { updateDropdowns } from "./components/dropdownTag.js"
import { suggestRecipes } from "./components/suggestRecipes.js"
import { generateSelectedTagsList } from "./components/selectedTagButton.js"

// To build the recipes count
const updateRecipesCount = (count) => {
    const recipeCountElement = document.querySelector(".recipes-count")
    recipeCountElement.textContent = `${count} recettes`
}

/*********** Initiation ***********/

window.onload = async () => {
    const { recipes } = await getRecipes()

    // To build the dropdown filters
    const filtersContainer = document.querySelector(".filter_container")
        
    const filterAndDisplayRecipes = () => {
        
        // To get the input value and convert it to lowercase to facilitate comparison
        let filterInput = document.querySelector(".inputSearchBarHeader").value.toLowerCase()

        const tagsList = generateSelectedTagsList()

        // To filter the list of recipes (stored in "recipes") based on the value of the input and the list of the selected tags
        const filtered = searchRecipes(recipes, filterInput, tagsList)
        const pagination = document.querySelector(".recipes-pagination")
        
        // To display the filtered recipes
        if (filtered.length > 0) {
            displayCards(filtered)
            pagination.style.display = "flex"
        } else {
            const handleClickTag = (value) => {
                inputSearchBarHeader.value = value
                inputSearchBarHeader.dispatchEvent(new Event("input"))
            }
            // To display the no result message
            suggestRecipes(handleClickTag, tagsList, filterInput, pagination)
        }

        // To update the count with the filtered recipes
        updateRecipesCount(filtered.length)

        // To update the dropdowns with the filtered recipes
        updateDropdowns(filtersContainer, filtered, debounceSearchRecipes, tagsList)
    }
    
    // To debounce the filter system
    const debounceSearchRecipes = debounce(filterAndDisplayRecipes, -1)

    // Header's search bar input: to clear the text (by clicking on the delete btn) and to add the debounce event
    const setupSearchBar = (inputElement, deleteButton) => {
        searchBarInput(inputElement, deleteButton)
        inputElement.addEventListener("input", () => {
            document.querySelector(".filter_tag_container").innerHTML = ""
            debounceSearchRecipes()
        })
    }

    // To configure the search bar
    const inputSearchBarHeader = document.querySelector(".inputSearchBarHeader")
    setupSearchBar(inputSearchBarHeader, document.querySelector(".button_delete_input_text_header"))

    // To call the filter and display recipes function
    filterAndDisplayRecipes()
}
