import { buildDropdown } from "./dropdown.js";

export class DropdownTag { 

    // On prend un objet en paramètre, qui contient plusieurs propriétés (qu'on importe de buildDropdown)
    constructor({name, id, parent, tagList, onclickTag = () => {}}) {

        const tagTemplate = document.getElementById("template-dropdown-tag-item").content
        const dropdown = buildDropdown(name, id, parent)
        const tagContainer = dropdown.querySelector(".dropdown-tag-container")
        const inputSearchBarFilter = dropdown.querySelector(".inputSearchBarFilter")

        tagList.forEach(tag => {
            const tagElement = tagTemplate.cloneNode(true).querySelector(".dropdown-tag-item-name")
            // On donne le nom du tag pour le texte qui s'affiche
            tagElement.textContent = tag

            tagElement.onclick = () => {
                onclickTag?.(tagElement, name, tag)
                // On cache le tag du dropdown, et on l'ajoute dans le tagContainer à la place
                tagElement.style.display = "none"
            }
            tagContainer.appendChild(tagElement)
        })

        // Quand on écrit dans l'input, ça filtre les listes des tags
        inputSearchBarFilter.addEventListener("input", () => {
            const inputValue = inputSearchBarFilter.value.toLowerCase()
            this.tagsLists(inputValue)
        })

        // On sauvegarde le nom du dropdown
        this.name = name
        // On sauvegarde la liste originale des tags
        this.originalTags = tagList
        // On renvoie au conteneur des tags
        this.tagContainer = tagContainer
        
    }

    tagsLists(inputValue) {
        this.tagContainer.querySelectorAll(".dropdown-tag-item-name").forEach(tagElement => {
            const tag = tagElement.textContent.toLowerCase()
            // Les tags qui correspondent à ce qu'on écrit dans l'input => flex
            if (tag.includes(inputValue)) {
                tagElement.style.display = "flex"
            } else {
                tagElement.style.display = "none"
            }
        })
    }

    // On prend une nouvelle liste de tags pour update l'affichage dans le dropdown
    update(newTagList) {
        // Pour chaque tagElement contenu dans tagContainer
        this.tagContainer.querySelectorAll(".dropdown-tag-item-name").forEach(tagElement => {
            // Si chaque tagElement de newTagList existe dans le dropdown => on le rend visible
            if (newTagList.find ( tag => tag.toLowerCase() === tagElement.textContent.toLowerCase())) {
                tagElement.style.display = "flex"
            } tagElement.style.display = "none"
        })
    }
}

export const updateDropdowns = (filtered) => {
    /* 
    On cache tous les tags qui ne sont pas dans les recettes affichées
    Comment faire le lien avec les éléments filtrés par la barre de recherche principale ?

    const tagContainer pour chaque dropdowns { "Ingrédients", "Appareils", "Ustensiles" }
    const tags-dans-recettes-filtrées pour chaque : { "ingredients", "appliances", "utensils" }
    const tagElement = document.querySelectorAll(".dropdown-tag-item-name")

    filtered.forEach(recipe => {
        forEach ingredient dans tags-dans-recettes-filtrées
        forEach appliances dans tags-dans-recettes-filtrées
        forEach utensils dans tags-dans-recettes-filtrées
    })

    dropdowns.forEach() => {

        tagElements.forEach(tagElement => {
            Si tagElement fait partie de tags-dans-recettes-filtrées
                Alors tagElement.style.display = "flex"
            Sinon
                tagElement.style.display = "none"
        })
    }

    */ 
}