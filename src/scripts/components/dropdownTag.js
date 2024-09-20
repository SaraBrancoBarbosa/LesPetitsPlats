import { buildDropdown } from "./dropdown.js";

export const dropdownTag = (name, id, parent, tagList, onClickTag = () => {}) => {
    //"dropdown-tag-container"
    const tagTemplate = document.getElementById("template-dropdown-tag-item").content

    const dropdown = buildDropdown (name, id, parent)
    const tagContainer = dropdown.querySelector(".dropdown-tag-container")
    tagList.forEach(tag => {
        const tagElement = tagTemplate.cloneNode(true).querySelector(".dropdown-tag-item-name")
        tagElement.textContent = tag
        tagElement.onclick = () => {
            onClickTag?.(tag)
            tagElement.style.display = "none"
        }
        tagContainer.appendChild(tagElement)
    })
}