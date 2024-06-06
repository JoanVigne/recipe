const buttonsOpenModalAddRecipe = document.querySelectorAll(
  ".open-modal-add-a-recipe"
);
buttonsOpenModalAddRecipe.forEach((button) => {
  button.addEventListener("click", () => {
    console.log("open");
    modalAddRecipe.style.display = "block";
  });
});

const modalAddRecipe = document.querySelector(".modal-add-a-recipe");
const formAddRecipe = modalAddRecipe.querySelector("form");
// close when clicking outside the modal
modalAddRecipe.addEventListener("click", function () {
  modalAddRecipe.style.display = "none";
});
// not close when click on form
formAddRecipe.addEventListener("click", function (event) {
  event.stopPropagation();
});
// close button
const closeAddRecipe = modalAddRecipe.querySelector(".close");
closeAddRecipe.addEventListener("click", function () {
  modalAddRecipe.style.display = "none";
});
