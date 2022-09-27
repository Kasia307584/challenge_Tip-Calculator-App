const inputBill = document.querySelector("#bill");
const inputCustom = document.querySelector("#custom");
const inputNbrPeople = document.querySelector("#nbr-people");
const btnPercentage = document.querySelectorAll(".btn-small");
const btnReset = document.querySelector(".btn-large");

// when custom input clicked empty it
inputCustom.addEventListener("click", () => {
  inputCustom.value = "";
});

// function which displays error message when input field non valid
const checkValidity = (inputField) => {
  if (!inputField.validity.valid) {
    inputField.parentElement.setAttribute("data-error-visible", "true");
  } else {
    inputField.parentElement.setAttribute("data-error-visible", "false"); // setAttribute utilisé ici car data-error-visible est un attribut HTML non standardisé
  }
};

// function which reads the input value
const readValue = (event) => {
  let value = event.currentTarget.value;
  return value;
};

// when inputs loose focus display error message (when needed) and read input value
inputBill.addEventListener("blur", (event) => {
  checkValidity(inputBill);
  let inputBillValue = readValue(event);
});
inputNbrPeople.addEventListener("blur", (event) => {
  checkValidity(inputNbrPeople);
  let inputNbrPeopleValue = readValue(event);
});
inputCustom.addEventListener("blur", readValue);

// function which toggles button's colors and returns button's content
let selected = null;
const applyPercentage = (e) => {
  selected?.classList.remove("btn-small--active");
  if (selected === e.currentTarget) {
    selected = null;
  } else {
    e.currentTarget.classList.add("btn-small--active");
    selected = e.currentTarget;
    return selected.textContent;
  }
};

// when button clicked toggle colors and return percentage chosen
btnPercentage.forEach((btn) => {
  btn.addEventListener("click", applyPercentage);
});
