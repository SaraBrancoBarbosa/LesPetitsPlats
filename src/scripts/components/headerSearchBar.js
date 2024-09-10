export function deleteTextButton() {
    // Main search bar: delete the text by clicking on the delete button
    let inputSearchBar = document.querySelector(".inputSearchBar");
    let buttonSearchBar = document.querySelector(".buttonSearchBar");
    
    inputSearchBar.addEventListener("input", function() { 
        // Displays the button only if the field is not empty
        if (inputSearchBar.value) {
            buttonSearchBar.style.display = "flex";
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