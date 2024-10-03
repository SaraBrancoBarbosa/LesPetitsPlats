import { updateRecipeCount } from "../app.js"
/*********** Search recipes - main search bar ***********/

// Fonction 1 : lancer la recherche avec la main search bar
export function searchRecipes() {
    let filterInput = document.querySelector(".inputSearchBarHeader").value
    filterInput = filterInput.toLowerCase()

    // On crée une variable pour les recettes visibles (pour pouvoir incrémenter ensuite le compteur)
    let displayedRecipesCount = 0
    
    // Pour que la recherche ne commence qu'à partir de 3 caractères. En dessous de 3, on affiche tout
    if (filterInput.length < 3) {
        const recipiesContainer = document.querySelector(".recipes-main-container")
        const recipes = recipiesContainer.querySelectorAll(".card")

        recipes.forEach(recipe => {
            recipe.style.display = "flex"
        })

        // Pour mettre à jour le compteur avec le nombre total de recettes (sinon quand on efface, le nombre ne change pas)
        updateRecipeCount(recipes.length)

        return
    }

    const recipiesContainer = document.querySelector(".recipes-main-container")
    const recipes = recipiesContainer.querySelectorAll(".card")

    recipes.forEach(recipe => {
        const recipeName = recipe.querySelector(".card_content_title").textContent.toLowerCase()
        const ingredients = [...recipe.querySelectorAll(".font-medium")].map(ingredient => ingredient.textContent.toLowerCase())
        const recipeDescription = recipe.querySelector(".card_content_text_recipe").textContent.toLowerCase()
        
        // Là on cherche dans les trois en même temps. Est-ce qu'on devrait plutôt faire d'abord name, puis ingredients, puis description ?
        const isMatch = recipeName.includes(filterInput) ||
        // Pour qu'au moins un ingredient du tableau passe le test
        ingredients.some(ingredient => ingredient.includes(filterInput)) ||
        recipeDescription.includes(filterInput)
        
        // Pour cacher ou réafficher les recettes en fonction du résultat
        recipe.style.display = isMatch ? "flex" : "none"

        // On incrémente le compteur avec les recettes visibles
        if (isMatch) displayedRecipesCount++
        });

        // Et donc on update le compteur avec le nombre de recettes visibles
        updateRecipeCount(displayedRecipesCount)
}

export function enableClearInputText (input, button) {
    // Search bar (input): delete the text by clicking on the delete button
    input?.addEventListener("input", function() {
        
        // HTML tag injection risks: ban chevrons
        if (input.value.includes("<") || input.value.includes(">")) {
            // When the user writes them, they are replaced with an empty string
            input.value = input.value.replace(/<|>/g, "")
        }
        
        // Displays the button only if the field is not empty
        if (input.value) {
            button.style.display = "flex"
            input.classList.add("[&::-webkit-search-cancel-button]:hidden")
        } else {
            button.style.display = "none"
        }
    })

    function deleteText() {
        input.value = ""
        button.style.display = "none"

        // On met la recherche à jour quand on supprime le texte
        searchRecipes()
    }

    button?.addEventListener("click", deleteText)
}

export function deleteTextButtonHeader() {
    // Main search bar: delete the text by clicking on the delete button
    const inputSearchBar = document.querySelector(".inputSearchBarHeader")
    const buttonSearchBar = document.querySelector(".buttonSearchBarHeader")
    enableClearInputText(inputSearchBar, buttonSearchBar)
}

export function deleteTextButtonFilter() {
    // Filter search bar: delete the text by clicking on the delete button
    let inputSearchBarFilter = document.querySelector(".inputSearchBarFilter")
    let buttonSearchBarFilter = document.querySelector(".buttonSearchBarFilter")
    enableClearInputText(inputSearchBarFilter, buttonSearchBarFilter)
}