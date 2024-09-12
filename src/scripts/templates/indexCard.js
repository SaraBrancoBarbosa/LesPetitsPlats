// Card template
export function getRecipeCardDOM(cardRecipe) {
    const { image, name, ingredients, time, description } = cardRecipe;

    const template = document.getElementById("template-card");

    const card = template.content.cloneNode(true);

    const img = card.querySelector(".card_img");
    img.src = `public/assets/img/${image}`;
    img.alt = "Image du plat";

    const h2 = card.querySelector(".card_content_title");
    h2.textContent = `${name}`;

    const recipeDescription = card.querySelector(".card_content_text_recipe");
    recipeDescription.textContent = `${description}`;

    const ingredientList = card.querySelector(".card_content_text_ingredient_list");
    ingredientList.innerHTML = "";

    // To display all the ingredients with the quantity and unit for each card
    ingredients.forEach(({ ingredient, quantity, unit }) => {
        const ingredientItem = document.createElement("p");
        ingredientItem.classList.add("font-medium");
        ingredientItem.textContent = `${ingredient}`;
        
        const ingredientQuantityUnity = document.createElement("p");
        ingredientQuantityUnity.classList.add("text-grey");
        ingredientQuantityUnity.textContent = `${quantity ?? ""} ${unit ?? ""}`.trim();

        // To pair each ingredient with their associated quantity & unit
        const ingredientPairing = document.createElement("div");

        ingredientPairing.appendChild(ingredientItem);
        ingredientPairing.appendChild(ingredientQuantityUnity);
        ingredientList.appendChild(ingredientPairing);
        
    });

    const recipeTime = card.querySelector(".time-recipe");
    recipeTime.textContent = `${time}min`;

    return card;
}