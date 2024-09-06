// Card template
export function getRecipeCardDOM(cardRecipe) {
    const { id, image, name, servings, ingredient, quantity, unit, time, description, appliance, ustensils } = cardRecipe;

    const template = document.getElementById("template-card");

    const card = template.content.cloneNode(true);

    const img = card.querySelector(".card_img");
    img.src = `public/assets/img/${image}`;
    img.alt = "Image du plat";

    const h2 = card.querySelector(".card_content_title");
    h2.textContent = `${name}`;

    const textRecipe = card.querySelector(".card_content_text_recipe");
    textRecipe.textContent = `${description}`;

    return card;
}