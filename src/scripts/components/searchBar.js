export const searchBarInput = (input, button) => {
    input?.addEventListener("input", function() {

        // HTML tag injection risks
        if (input.value.includes("<") || input.value.includes(">")) {
            input.value = input.value.replace(/<|>/g, "")
        }
        
        // Displays the button only if the field is not empty
        if (input.value) {
            button.style.display = "flex"
        } else {
            button.style.display = "none"
        }

    })

    function deleteText() {
        input.value = ""
        button.style.display = "none"
        // Method to invoke an event (input). Bubbles: if true, allows to handle events in a hierarchical way (DOM ancestor/parent)
        input.dispatchEvent(new Event("input", { bubbles: true }))
    }

    button?.addEventListener("click", deleteText)
}