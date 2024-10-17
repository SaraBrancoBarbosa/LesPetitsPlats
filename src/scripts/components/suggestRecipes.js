/*********** When there is no recipe found, displays a message to the user with suggestions ***********/

export const suggestRecipes = (onClick, tagsList, filterInput, pagination) => {
    const container = document.querySelector(".recipes-main-container")
    container.innerHTML = ""
    const noResult = document.createElement("div")

    const suggestions = ["tarte aux pommes", "poisson"]

    const searchSuggestions = suggestions.map(suggestion => {
        const span = document.createElement("span")
        span.textContent = suggestion
        // Visual changes to let the user know they can click
        span.style.cursor = "pointer"
        span.style.textDecoration = "underline"
        
        // To replace the search bar text with the clicked suggestion and to filter again
        span.onclick = () => {
            // To call the filter function
            onClick(suggestion)
        }
        return span
    })

    // For the message, we collect the text of the input and the names of the selected tags
    const selectedTags = tagsList.map(tag => tag.value).join(", ")
    const searchTerm = filterInput ? `« ${filterInput} »` : ""
    noResult.textContent = `Aucune recette ne contient ${searchTerm} ${selectedTags ? "et les tags : " + selectedTags : ""}. Vous pouvez chercher `

    // To add the suggestions at the end of the message
    searchSuggestions.forEach((element, index) => {
        noResult.appendChild(element)
        if (index < searchSuggestions.length - 1) {
            // To add a comma + space between the suggestions
            noResult.appendChild(document.createTextNode(", "))
        }
    })

    // The end of the message
    noResult.appendChild(document.createTextNode(", etc."))
    container.appendChild(noResult)

    // When there is no recipe found, the pagination disappears
    pagination.style.display = "none"
}