// Card template

// Gestion du pluriel
const units = ["kg","hg","dag","g","dg","cg","mg", "l","dl","cl","ml"]
const managePlural = (unit, quantity) => {
  if (!quantity || !unit || units.includes(unit)) return ((quantity??"")+" "+(unit??"")).trim()
  const words = unit.toLowerCase().split(" ")
  if (quantity > 1 && !["s","x"].includes(words[0][words[0].length-1])) {
    words[0] = words[0] + "s"
  } else if (quantity <=1 && ["s","x"].includes(words[0][words[0].length-1])) {
    words[0] = words[0].slice(0, -1)
  }
  return (quantity+" "+words.join(" ")).trim()
}

export function getRecipeCardDOM(cardRecipe) {
    const { image, name, ingredients, time, description } = cardRecipe;

    const template = document.getElementById("template-card");

    const card = template.content.cloneNode(true);

    const img = card.querySelector(".card_img");
    img.src = `./public/assets/img/${image}`;
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
        ingredientQuantityUnity.textContent = managePlural(unit, quantity);

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