// Card template
export function getRecipeCardDOM(cardRecipe) {
    const { image, name, ingredient, quantity, unit, time, description } = cardRecipe;

    const template = document.getElementById("template-card");

    const card = template.content.cloneNode(true);

    const img = card.querySelector(".card_img");
    img.src = `public/assets/img/${image}`;
    img.alt = "Image du plat";

    const h2 = card.querySelector(".card_content_title");
    h2.textContent = `${name}`;

    const recipeDescription = card.querySelector(".card_content_text_recipe");
    recipeDescription.textContent = `${description}`;

    const textIngredient = card.querySelector(".ingredient");
    textIngredient.textContent = `${ingredient}`;
    console.log(textIngredient)

    const quantityAndUnit = card.querySelector(".quantity_unit");
    quantityAndUnit.textContent = `${quantity} ${unit}`;

    const recipeTime = card.querySelector(".time-recipe");
    recipeTime.textContent = `${time}min`;

    return card;
}