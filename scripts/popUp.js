const popUp = document.getElementById("pop-up");
const popUpToggler = document.getElementById("toggleButton");
const buttonIcon = document.getElementById("buttonIcon");
// toggle between 2 classes
popUpToggler.addEventListener("click", () => {
  popUp.classList.toggle("hidePopUp");
  buttonIcon.classList.toggle("closed");
});

export { popUpToggler };
