import { buildDropdown } from "../templates/dropdown.js"
import { updateTagContainerDisplay, addSelectedTag } from "./selectedTagButton.js"
import { generateListsFromRecipes } from "./listsFromRecipes.js"

export class DropdownTag { 

    // To take an object as a parameter, which contains several properties (which are imported from buildDropdown)
    constructor({name, id, parent, tagList, onclickTag = () => {}}) {

        const tagTemplate = document.getElementById("template-dropdown-tag-item").content
        const dropdown = buildDropdown(name, id, parent)
        const tagContainer = dropdown.querySelector(".dropdown-tag-container")
        const inputSearchBarFilter = dropdown.querySelector(".inputSearchBarFilter")

        tagList.forEach(tag => {
            const tagElement = tagTemplate.cloneNode(true).querySelector(".dropdown-tag-item-name")
            // To give the name of the tag to the displayed text
            tagElement.textContent = tag

            tagElement.onclick = () => {
                onclickTag?.(tagElement, name, tag)
                // To hide the tag from the dropdown, and to add it to the tagContainer instead
                tagElement.style.display = "none"
            }
            tagContainer.appendChild(tagElement)
        })

        // To filter the tag lists when writing in the input
        inputSearchBarFilter.addEventListener("input", () => {
            const inputValue = inputSearchBarFilter.value
            this.tagsLists(inputValue)
        })

        // To save the dropdown name
        this.name = name
        // To save the original tags list
        this.originalTags = tagList
        // To return to the tag container
        this.tagContainer = tagContainer
        
    }

    tagsLists(inputValue) {
        this.tagContainer.querySelectorAll(".dropdown-tag-item-name").forEach(tagElement => {
            const tag = tagElement.textContent.toLowerCase()
            // To flex the tags corresponding to what the user writes in the input
            if (tag.includes(inputValue)) {
                tagElement.style.display = "flex"
            } else {
                tagElement.style.display = "none"
            }
        })
    }

    // To take a new list of tags to update the display in the dropdown
    update(newTagList) {
        // For each tagElement contained in tagContainer
        this.tagContainer.querySelectorAll(".dropdown-tag-item-name").forEach(tagElement => {
            // To flex if each tagElement of newTagList exists in the dropdown
            if (newTagList.find ( tag => tag.toLowerCase() === tagElement.textContent.toLowerCase())) {
                tagElement.style.display = "flex"
            } else { 
                tagElement.style.display = "none" 
            }
        })
    }
}
    
export const updateDropdowns = (filtersContainer, filteredRecipes, callback, tagsList) => {    
    const ingredients = []
    const appliances = []
    const utensils = []

    generateListsFromRecipes(filteredRecipes, ingredients, appliances, utensils, tagsList)

    const dropdowns = [
        { 
            name: "Ingrédients", 
            id: "dropdown_ingredients", 
            tagList: ingredients 
        }, { 
            name: "Appareils", 
            id: "dropdown_appliances", 
            tagList: appliances 
        }, { 
            name: "Ustensiles", 
            id: "dropdown_utensils", 
            tagList: utensils 
        }
    ]

    dropdowns.forEach(({ name, id, tagList }) => {
        // To clear dropdown tags
        const dropdown = document.getElementById(id)
        if (dropdown) dropdown.remove()

        // To fill dropdown tags
        new DropdownTag({
            name,
            id,
            parent: filtersContainer,
            tagList,
            onclickTag: (...args) => { addSelectedTag(callback, ...args); callback?.(); }
        })
    })

    updateTagContainerDisplay()
}