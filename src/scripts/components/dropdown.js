import { enableClearInputText } from "./searchBars.js"

const dropdowns = []

export const initDropDown = () => {
    const dropdownClickAway = document.getElementById("dropdown-clickawaylistener")
    dropdownClickAway.addEventListener("click", () => {
        closeAllDropdowns();
    });
};

const closeAllDropdowns = () => {
    dropdowns.forEach(d => {
        d.querySelector(".dropdown_filter").style.display = "none";
        d.querySelector(".icon_filter").classList.remove("icon_open");
    });
    document.getElementById("dropdown-clickawaylistener").style.display = "none";
};

export const buildDropdown = (name, id, parent = null) => {
    const dropdownClickAway = document.getElementById("dropdown-clickawaylistener")
    const dropdownFragment = document.getElementById("template-component-dropdown").content.cloneNode(true);
    const dropdown = dropdownFragment.querySelector(".dropdown-container")
    dropdown.setAttribute("id", id)

    const button = dropdown.querySelector("#filter_dropdown_button")
    const buttonName = button.querySelector("#filter_dropdown_button_name")
    buttonName.textContent = name

    button.onclick = () => {
        const dropdownFilter = dropdown.querySelector(".dropdown_filter");
        const chevron = dropdown.querySelector(".icon_filter");
        
        if (dropdownFilter.style.display === "flex") {
            dropdownFilter.style.display = "none";
            chevron.classList.remove("icon_open");
            dropdownClickAway.style.display = "none";
        } else {
            closeAllDropdowns();
            dropdownFilter.style.display = "flex";
            chevron.classList.add("icon_open");
            dropdownClickAway.style.display = "block";
        }
    };

    if (parent) parent.appendChild(dropdown)

    dropdowns.push(dropdown)

    enableClearInputText(dropdown.querySelector(".inputSearchBarFilter"), dropdown.querySelector(".buttonSearchBarFilter"))

    return dropdown
}