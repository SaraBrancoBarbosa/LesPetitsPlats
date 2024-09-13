export function deleteTextButtonHeader() {
    // Main search bar: delete the text by clicking on the delete button
    let inputSearchBar = document.querySelector(".inputSearchBarHeader");
    let buttonSearchBar = document.querySelector(".buttonSearchBarHeader");
    
    inputSearchBar.addEventListener("input", function() { 
        // Displays the button only if the field is not empty
        if (inputSearchBar.value) {
            buttonSearchBar.style.display = "flex";
            inputSearchBar.classList.add("[&::-webkit-search-cancel-button]:hidden");
        } else {
            buttonSearchBar.style.display = "none";
        }
    });

    function deleteText() {
        inputSearchBar.value = "";
        buttonSearchBar.style.display = "none";
    }

    buttonSearchBar.addEventListener("click", deleteText);
}

export function deleteTextButtonFilter() {
    // Main search bar: delete the text by clicking on the delete button
    let inputSearchBarFilter = document.querySelector(".inputSearchBarFilter");
    let buttonSearchBarFilter = document.querySelector(".buttonSearchBarFilter");
    
    inputSearchBarFilter.addEventListener("input", function() { 
        // Displays the button only if the field is not empty
        if (inputSearchBarFilter.value) {
            buttonSearchBarFilter.style.display = "flex";
            inputSearchBarFilter.classList.add("[&::-webkit-search-cancel-button]:hidden");
        } else {
            buttonSearchBarFilter.style.display = "none";
        }
    });

    function deleteText() {
        inputSearchBarFilter.value = "";
        buttonSearchBarFilter.style.display = "none";
    }

    buttonSearchBarFilter.addEventListener("click", deleteText);
}