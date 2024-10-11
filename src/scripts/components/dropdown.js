import { searchBarInput } from "./searchBar.js"

/*********** Filters dropdown ***********/

const dropdowns = []

export const initClickAwayDropdown = () => {
    const dropdownClickAway = document.getElementById("dropdown-clickawaylistener")
    dropdownClickAway.addEventListener("click", () => {
        closeAllDropdowns()
    })
}

const closeAllDropdowns = () => {
    dropdowns.forEach(d => {
        d.querySelector(".dropdown_filter").style.display = "none"
        d.querySelector(".icon_filter").classList.remove("icon_open")
    })
    document.getElementById("dropdown-clickawaylistener").style.display = "none"
}

export const buildDropdown = (name, id, parent = null) => {
    const dropdownClickAway = document.getElementById("dropdown-clickawaylistener")
    const dropdownFragment = document.getElementById("template-component-dropdown").content.cloneNode(true);
    const dropdown = dropdownFragment.querySelector(".dropdown-container")
    dropdown.setAttribute("id", id)

    const button = dropdown.querySelector("#filter_dropdown_button")
    const buttonName = button.querySelector("#filter_dropdown_button_name")
    // To adapt each dropdown name to its button
    buttonName.textContent = name

    button.onclick = () => {
        const dropdownFilter = dropdown.querySelector(".dropdown_filter")
        const chevron = dropdown.querySelector(".icon_filter")
        const inputSearchBarFilter = dropdown.querySelector(".inputSearchBarFilter")
        
        // To open and close the dropdowns
        if (dropdownFilter.style.display === "flex") {
            dropdownFilter.style.display = "none"
            chevron.classList.remove("icon_open")
            dropdownClickAway.style.display = "none"
        } else {
            closeAllDropdowns();
            dropdownFilter.style.display = "flex"
            chevron.classList.add("icon_open")
            dropdownClickAway.style.display = "flex"
            inputSearchBarFilter.focus()
        }
    }

    // To check if a parent was provided during the call, and the dropdown is added as a child to that parent
    if (parent) parent.appendChild(dropdown)

    // The array keeps track of all dropdowns created, to be able to close them all at once
    dropdowns.push(dropdown)

    // Two arguments: the input and the button to delete the text. Each dropdown has its own
    searchBarInput(dropdown.querySelector(".inputSearchBarFilter"), dropdown.querySelector(".button_delete_input_text_dropdown"))

    return dropdown
}