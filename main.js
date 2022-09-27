const inputBill = document.querySelector("#bill");
const inputCustom = document.querySelector("#custom");
const inputNbrPeople = document.querySelector("#nbr-people");
const btnPercentage = document.querySelectorAll(".btn-small");
const btnReset = document.querySelector(".btn-large");

// empty custom input when clicked
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

let inputBillValue;
let inputNbrPeopleValue;
let inputCustomValue;
// display error message (when needed) and read input value when inputs loose focus
inputBill.addEventListener("blur", (event) => {
  checkValidity(inputBill);
  inputBillValue = readValue(event);
  countTip();
  total();
});
inputNbrPeople.addEventListener("blur", (event) => {
  checkValidity(inputNbrPeople);
  inputNbrPeopleValue = readValue(event);
  countTip();
  total();
});
inputCustom.addEventListener("blur", (event) => {
  if (event.currentTarget.value === "") {
    event.currentTarget.value = "Custom";
  } else {
    inputCustomValue = readValue(event);
    inputCustom.classList.add("btn-small--active");
    selected = event.currentTarget;
    btnPercentage.forEach((btn) => btn.classList.remove("btn-small--active"));
    percentageConverted = null;
    countTip();
    total();
  }
});

// function which toggles button's colors and reads percentage chosen
let selected = null;
let percentageConverted;
const applyPercentage = (e) => {
  selected?.classList.remove("btn-small--active");
  if (selected === e.currentTarget) {
    selected = null;
  } else {
    e.currentTarget.classList.add("btn-small--active");
    inputCustom.value = "Custom";
    selected = e.currentTarget;
    buttonValue = selected.textContent;
    let indexP = buttonValue.lastIndexOf("%");
    percentageConverted = buttonValue.slice(0, indexP);
    percentageConverted = Number.parseInt(percentageConverted) / 100;
    inputCustomValue = null;
    countTip();
    total();
  }
};

// toggle colors and return percentage chosen when button clicked
btnPercentage.forEach((btn) => {
  btn.addEventListener("click", applyPercentage);
});

// function which counts tip amount per person
const countTip = () => {
  const billConverted = Number.parseInt(inputBillValue, 10);
  const nbrPeopleConverted = Number.parseInt(inputNbrPeopleValue, 10);
  const customConverted = Number.parseInt(inputCustomValue, 10) / 100;
  return (
    (billConverted / nbrPeopleConverted) *
    (customConverted ? customConverted : percentageConverted)
  );
};

// function which counts total amount per person
const total = () => {
  return inputBillValue / inputNbrPeopleValue + countTip();
};
