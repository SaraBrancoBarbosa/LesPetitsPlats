export function filterDropDown() {

    // DOM elements
    const dropdownFilter = document.querySelector(".dropdown_filter");
    const buttonFilter = document.querySelector(".button_filter");
    const iconFilter = document.querySelector(".icon_filter");

    /*********** Launching and closing filter ***********/

    function openDropdown() {
        dropdownFilter.style.display = "flex";
        iconFilter.style.transform = "scaleY(1)";
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
    buttonFilter.onclick = swapDropdown

}