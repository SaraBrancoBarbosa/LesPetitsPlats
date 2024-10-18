import { buildDropdown } from "../templates/dropdown.js"
import { addSelectedTag } from "./selectedTag.js"

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
            const inputValue = inputSearchBarFilter.value
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
            } else { 
                tagElement.style.display = "none" 
            }
        })
    }
}

// Fonction pour vider et remplir uniquement les tags dans les dropdowns
function clearAndFillDropdownTags(dropdownId, tags, debounceSearchRecipes) {
    const dropdown = document.getElementById(dropdownId)
    const tagContainer = dropdown.querySelector(".dropdown-tag-container")
    
    // On vide le conteneur de tags
    tagContainer.innerHTML = ""
    
    // On remplit le conteneur avec les nouveaux tags des recettes filtrées
    tags.forEach(tag => {
        const tagTemplate = document.getElementById("template-dropdown-tag-item").content
        const tagElement = tagTemplate.cloneNode(true).querySelector(".dropdown-tag-item-name")
        tagElement.textContent = tag
        
        // Attacher l'événement onclick à chaque tag
        tagElement.onclick = () => {
            // Logique de sélection du tag
            addSelectedTag(debounceSearchRecipes, tagElement, dropdownId, tag)
            tagElement.style.display = "none"
        }
        
        tagContainer.appendChild(tagElement)
    })
}
    
// Fonction pour initialiser les dropdowns
export const initialiseDropdowns = (dropdowns, filtersContainer, debounceSearchRecipes) => {
    dropdowns.forEach(({ name, id, tagList }) => {
        new DropdownTag({
            name,
            id,
            parent: filtersContainer,
            tagList,
            onclickTag: (...args) => { addSelectedTag(debounceSearchRecipes, ...args) }

            /**
             * onclickTag: this line allows to manage the tag selection logic and to perform a search based on the selected tags
             * (...args): rest parameters, to accept an indefinite number of arguments as an array
             * addSelectedTag called with 2 arguments: the debounce and the spread operator (all arguments passed to onclickTag will be passed to addSelectedTag)
            */
        })
    })
}

export function updateDropdowns(filteredRecipes, debounceSearchRecipes) {    
    const ingredients = new Set()
    const appliances = new Set()
    const utensils = new Set()

    filteredRecipes.forEach(recipe => {
        recipe.ingredients.forEach(({ ingredient }) => {
            ingredients.add(ingredient.toLowerCase())
        });

        appliances.add(recipe.appliance.toLowerCase())

        recipe.utensils.forEach(utensil => {
            utensils.add(utensil.toLowerCase())
        })
    })
    
    // On convertit les sets en tableaux pour mettre à jour les dropdowns
    clearAndFillDropdownTags("dropdown_ingredients", Array.from(ingredients), debounceSearchRecipes)
    clearAndFillDropdownTags("dropdown_appliances", Array.from(appliances), debounceSearchRecipes)
    clearAndFillDropdownTags("dropdown_utensils", Array.from(utensils), debounceSearchRecipes)
}