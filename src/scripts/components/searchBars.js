export function enableClearInputText (input, button) {
    // Main search bar: delete the text by clicking on the delete button
    input?.addEventListener("input", function() {
        
        //  HTML tag injection risks: ban chevrons
        if (input.value.includes("<") || input.value.includes(">")) {
            // When the user writes them, they are replaced with an empty string
            input.value = input.value.replace(/<|>/g, "");
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