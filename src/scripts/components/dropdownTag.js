import { buildDropdown } from "./dropdown.js";

function addTag(selectedTagName, pDropdownTag) {
    const selectedTagFragment = document.getElementById("selected-tag-button").content.cloneNode(true)
    const selectedTag = selectedTagFragment.querySelector(".selected_tag")
    selectedTag.querySelector("#selected_tag_name").textContent = selectedTagName
    
    selectedTag.onclick = () => {
        // Pour supprimer le tag sélectionné
        selectedTag.remove()

        // Pour que le tag réapparaisse à nouveau dans le dropdown
        const tagElement = pDropdownTag.querySelectorAll(".dropdown-tag-item-name")
        tagElement.forEach(t => {
            if (t.textContent === selectedTagName) {
                t.style.display = "flex"
            }
        })
    }
    
    // Pour l'instant je mets ça là-dedans, mais j'aimerais qu'il soit dans la div avec les filtres
    document.querySelector(".filter_tag_container").appendChild(selectedTag);
}

export const dropdownTag = (name, id, parent, tagList, onClickTag = () => {}) => {
    const tagTemplate = document.getElementById("template-dropdown-tag-item").content
    const dropdown = buildDropdown (name, id, parent)
    const tagContainer = dropdown.querySelector(".dropdown-tag-container")

    tagList.forEach(tag => {
        const tagElement = tagTemplate.cloneNode(true).querySelector(".dropdown-tag-item-name")

        // Pour remettre la première lettre du tag en majuscule (bizarrement la class tailwind en html n'est pas prise en compte ?)
        const capitaliseFirstLetter = tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase()
        tag = capitaliseFirstLetter
        tagElement.textContent = tag

        tagElement.onclick = () => {
            onClickTag?.(tag)
            tagElement.style.display = "none"
            addTag(tag, tagContainer)
        }
        tagContainer.appendChild(tagElement)
    })
}