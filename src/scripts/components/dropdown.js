export function filterDropDown() {

    // DOM elements
    const dropdownFilter = document.querySelector(".dropdown_filter");
    const buttonFilters = document.querySelectorAll(".button_filter");
    const iconFilter = document.querySelector(".icon_filter");

    /*********** Launching and closing filter ***********/

    function openDropdown() {
        dropdownFilter.style.display = "flex";
        //dropdownFilter.style.transform = "translateY(-150px)";
        //dropdownFilter.style.transition = "400ms ease";
        //dropdownFilter.classList.add("-translate-y-[150px]", "transition", "duration-300");
        iconFilter.style.transform = "scaleY(1)";
        iconFilter.style.transition = "400ms ease";
        dropdownFilter.setAttribute("opened", true);
    }

    function closeDropdown() {
        dropdownFilter.style.display = "none";
        iconFilter.style.transform = "scaleY(-1)";
        dropdownFilter.setAttribute("opened", false);
    }

    function swapDropdown() {
        if (dropdownFilter.getAttribute("opened")==="true") {
            closeDropdown()
        } else {
            openDropdown()
        } 
    }

    // Open dropdown by clicking on the button
    for (const button of buttonFilters) {
        button.onclick = swapDropdown 
    }
}