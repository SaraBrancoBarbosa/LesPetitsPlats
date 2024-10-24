/*********** Filters: selected tags ***********/

function updateTagContainerDisplay() {
    const tagContainer = document.querySelector(".filter_tag_container")
    if (tagContainer.childElementCount === 0) {
        tagContainer.style.display = "none"
    } else {
        tagContainer.style.display = "flex"
    }
}

export function addSelectedTag(updateRecipesCount, tagElement, filter, tagName) {
    console.log("%cfilter[%s]: %c%s", "color:orange", filter, "color:#8B8000", tagName)

    // To create the selected tag
    const selectedTagFragment = document.getElementById("selected-tag-button").content.cloneNode(true)
    const selectedTag = selectedTagFragment.querySelector(".selected_tag")
    selectedTag.setAttribute("data-filter", filter)
    const tagElementText = selectedTag.querySelector(".selected_tag_name")
    tagElementText.textContent = tagName
    
    selectedTag.onclick = () => {
        selectedTag.remove()

        // If there is no tag, hides the tag container
        updateTagContainerDisplay()

        // To add the removed tag back to the dropdown
        tagElement.style.display = "flex"

        // To update the recipes count after removing the tag
        updateRecipesCount?.()
    }
    
    document.querySelector(".filter_tag_container").appendChild(selectedTag)
    
    updateTagContainerDisplay()

    // To update the recipes count after adding the tag
    updateRecipesCount?.()
}