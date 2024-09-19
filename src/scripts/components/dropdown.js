// To prevent further propagation of the current event
const stopMediaPropagation = (event) => { 
    event.stopPropagation();
}

export function filterDropDown() {

    /*********** DOM elements ***********/

    const buttonFilters = document.querySelectorAll(".button_filter");
    const dropdownFilter = document.querySelector(".dropdown_filter");
    
    // Pour "enregistrer" l'icône de base
    let currentIconFilter = null;

    /*********** Launching and closing filter ***********/

    function openDropdown(pIconFilter) {
        dropdownFilter.style.display = "flex";
        pIconFilter.style.transform = "scaleY(1)";
        pIconFilter.style.transition = "400ms ease";
        dropdownFilter.setAttribute("opened", true);

        // On mémorise l'icône transformée
        currentIconFilter = pIconFilter;

        dropdownFilter.addEventListener("click", stopMediaPropagation);
    }

    function closeDropdown(pIconFilter) {
        dropdownFilter.style.display = "none";
        pIconFilter.style.transform = "scaleY(-1)";
        dropdownFilter.setAttribute("opened", false);

        // Remet l'icône à null comme avant l'ouverture (on réinitialise)
        currentIconFilter = null;

        dropdownFilter.removeEventListener("click", stopMediaPropagation);
    }

    function swapDropdown(pIconFilter) {
        // Si une icône est déjà ouverte, la fermer avant d'ouvrir la nouvelle
        if (currentIconFilter && currentIconFilter !== pIconFilter) {
            closeDropdown(currentIconFilter);
        }
        if (dropdownFilter.getAttribute("opened")==="true") {
            closeDropdown(pIconFilter)
        } else {
            openDropdown(pIconFilter)
        } 
    }    

    buttonFilters.forEach(button => {
        button.addEventListener("click", function(event) {
            
            // Pour atteindre l'icône du bouton actuellement sélectionné
            const iconFilter = event.currentTarget.querySelector(".icon_filter");
            swapDropdown(iconFilter);

            // Pour afficher le dropdown sous le bon bouton
            const rect = event.target.getBoundingClientRect();
            dropdownFilter.style.top = `${rect.bottom + window.scrollY - 10}px`;
            dropdownFilter.style.left = `${rect.left}px`;
        });
    });

// Pour les données, faire un switch-case-break ? case "bouton ingrédients sélectionné": "afficher les données" ingrédients: break

}