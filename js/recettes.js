// containers :
const listRecettes = document.querySelector(".list-recettes");
// create a loading element inside the listRecettes container
const loadingElement = createLoadingElement();
document.body.appendChild(loadingElement);

async function getRecettes() {
  try {
    const response = await fetch("./assets/recettes.json");
    const data = await response.json();
    // creating li's
    data.forEach((recette) => {
      const li = document.createElement("li");
      const title = document.createElement("h2");
      title.textContent = recette.name;
      const description = document.createElement("p");
      description.textContent = recette.description;
      li.appendChild(title);
      li.appendChild(description);
      listRecettes.appendChild(li);
    });
    // add event listener li
    const listItems = listRecettes.getElementsByTagName("li");
    for (let i = 0; i < listItems.length; i++) {
      listItems[i].addEventListener("click", function () {
        const activeItems =
          listRecettes.getElementsByClassName("active-recipe");
        for (let i = 0; i < activeItems.length; i++) {
          activeItems[i].classList.remove("active-recipe");
        }
        this.classList.toggle("active-recipe");
        displayRecipeInfos(data[i]);
      });
    }
    listItems[0].classList.add("active-recipe");

    displayRecipeInfos(data[0]);
    return data;
  } catch (error) {
    console.error("Error:", error);
  } finally {
    loadingElement.style.display = "none"; // Hide loading element
  }
}

function displayRecipeInfos(thisRecipe) {
  console.log("thisRecipe item : ", thisRecipe);
  // display instructions
  const containerInstructions = document.querySelector(
    ".container-instructions"
  );
  containerInstructions.innerHTML = ""; // clear container
  const instructions = thisRecipe.instructions;
  console.log("instructions : ", instructions); // pas un tableau
  const titleInst = document.createElement("h2");
  titleInst.textContent = "Instructions";
  containerInstructions.append(titleInst);
  containerInstructions.append(instructions);
  // display ingredients
  const containerIngredients = document.querySelector(".container-ingredients");
  containerIngredients.innerHTML = ""; // clear container
  const ingredients = thisRecipe.ingredients;
  const titleIng = document.createElement("h2");
  titleIng.textContent = "Ingredients";
  containerIngredients.append(titleIng);
  console.log("ingredients : ", ingredients); // array
  for (let i = 0; i < ingredients.length; i++) {
    const ingredient = document.createElement("li");
    ingredient.textContent = ingredients[i];
    containerIngredients.appendChild(ingredient);
  }
  // display micro
  const containerMacro = document.querySelector(".container-micros");
  containerMacro.innerHTML = ""; // clear container
  console.log("macros : ", thisRecipe.micros); // object
  const micros = thisRecipe.micros;

  const titleMicro = document.createElement("h2");
  titleMicro.textContent = "Micros per 100g";
  containerMacro.append(titleMicro);
  Object.keys(micros).forEach((micro) => {
    const microItem = document.createElement("li");
    microItem.textContent = `${micro} : ${micros[micro]}`;
    containerMacro.appendChild(microItem);
  });
}
function displayImages() {
  const activeItem = listRecettes.querySelector(".active-recipe");
  console.log(activeItem);
}
getRecettes().then((recettes) => console.log(recettes));
