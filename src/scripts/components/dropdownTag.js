import { buildDropdown } from "./dropdown.js";

function addTag(selectedTagName, pDropdownTag) {
    const selectedTagFragment = document.getElementById("selected-tag-button").content.cloneNode(true)
    const selectedTag = selectedTagFragment.querySelector(".selected_tag")
    selectedTag.querySelector("#selected_tag_name").textContent = selectedTagName
    
    selectedTag.onclick = () => {
        // To delete the selected tag
        selectedTag.remove()

        // If there is no tag, hides the tag container
        updateTagContainerDisplay();

        // To add the removed tag back to the dropdown
        const tagElement = pDropdownTag.querySelectorAll(".dropdown-tag-item-name")
        tagElement.forEach(t => {
            if (t.textContent === selectedTagName) {
                t.style.display = "flex"
            }
        })
    }
    
    document.querySelector(".filter_tag_container").appendChild(selectedTag);
    
    // To update the container display when the tag is added
    updateTagContainerDisplay();
}

function updateTagContainerDisplay() {
    const tagContainer = document.querySelector(".filter_tag_container");
    if (tagContainer.childElementCount === 0) {
        tagContainer.style.display = "none";
    } else {
        tagContainer.style.display = "flex";
    }
}

// Fonction 2 : filter tags
export class DropdownTag { 

    constructor({name, id, parent, tagList, onClickTag = () => {}}) {

        const tagTemplate = document.getElementById("template-dropdown-tag-item").content
        const dropdown = buildDropdown (name, id, parent)
        const tagContainer = dropdown.querySelector(".dropdown-tag-container")

        tagList.forEach(tag => {
            const tagElement = tagTemplate.cloneNode(true).querySelector(".dropdown-tag-item-name")
            tagElement.textContent = tag

            tagElement.onclick = () => {
                onClickTag?.(tag)
                tagElement.style.display = "none"

                // To add the selected tags
                addTag(tag, tagContainer)
            }
            tagContainer.appendChild(tagElement)
        })

        this.name = name
        this.originalTags = tagList
        this.tagContainer = tagContainer
        
    }

    update(newTagList) {
        this.tagContainer.querySelectorAll(".dropdown-tag-item-name").forEach(tagElement => {
            tagElement.style.display = "none"
            if (newTagList.find ( tag => tag.toLowerCase() === tagElement.textContent.toLowerCase())) {
                tagElement.style.display = "flex"
            }
        })
    }
}