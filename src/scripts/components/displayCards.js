import { getRecipeCardDOM } from "../templates/cardRecipe.js"

/*********** Building the recipes cards and the recipes counter ***********/

export const buildCards = (recipes) => {
    const container = document.querySelector(".recipes-main-container")
    recipes.forEach((recipe) => {
        const recipeCardDOM = getRecipeCardDOM(recipe)
        container.appendChild(recipeCardDOM)
    })
}

export function updateRecipesCount(count) {
    const recipeCountElement = document.querySelector(".recipes-count")
    recipeCountElement.textContent = `${count} recettes`
}

/*********** Displaying the recipes cards + pagination system ***********/

export const displayData = async (recipes, page=1, itemsPerPage=10) => {    
    const paginated = itemsPerPage > 0 ? recipes.slice((page-1) * itemsPerPage, page * itemsPerPage) : recipes

    const container = document.querySelector(".recipes-main-container")
    container.innerHTML = ""

    paginated.forEach((recipe) => {
        const recipeCardDOM = getRecipeCardDOM(recipe)
        container.appendChild(recipeCardDOM)
    })

    updatePagination(recipes, page, itemsPerPage)
}

const updatePagination = (recipes, page, itemsPerPage) => {
    const pagination = document.querySelector(".recipes-pagination")
    pagination.innerHTML = ""

    // Math.ceil(): rounds up and returns the smallest integer greater than or equal to a given number (recipes.length: total number of recipes)
    const totalPages = Math.ceil(recipes.length / itemsPerPage)
    const pages = ["<<", "<"]
    for (let i = page -2 ; i<= page+2; i++) {
        if (i>0 && i <= totalPages) {
            pages.push(i)
        }
    }
    pages.push(">", ">>")

    for (let i of pages) {
        const btn = document.getElementById("template-pagination-button").content.cloneNode(true).querySelector(".pagination-button")
        btn.textContent = i
        btn.onclick=() => {
            // Math.max(1, ...) & Math.min(..., totalPages): the value will never be less than 1, nor greater than the total number of pages
            const p = Math.min(Math.max(1, 
                (i=== "<<") ? 1 : 
                i===">>" ? totalPages : 
                (i==="<") ? page -1 : 
                (i === ">") ? page +1 : 
                i
            ), totalPages)
            displayData(recipes, p, itemsPerPage)
        }
        pagination.appendChild(btn)            
    }    
}

const recipiesContainer = document.querySelector(".recipes-main-container")
    const recipes = recipiesContainer.querySelectorAll(".card")

recipes.forEach(recipe => {
    recipe.style.display = "flex"
})

updateRecipesCount(recipes.length)