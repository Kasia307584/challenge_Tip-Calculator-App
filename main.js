const inputBill = document.querySelector("#bill");
const inputCustom = document.querySelector("#custom");
const inputNbrPeople = document.querySelector("#nbr-people");
const btnPercentage = document.querySelectorAll(".btn-small");
const btnReset = document.querySelector(".btn-large");
const result = document.querySelectorAll(
  ".result > div > div > span:nth-child(2)"
);
const form = document.querySelector("form");

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
  value = Number.parseInt(value, 10);
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
  if (countTip()) {
    result[0].textContent = "$" + countTip().toFixed(2);
    result[1].textContent = "$" + total().toFixed(2);
  }
});
inputNbrPeople.addEventListener("blur", (event) => {
  checkValidity(inputNbrPeople);
  inputNbrPeopleValue = readValue(event);
  countTip();
  total();
  if (countTip()) {
    result[0].textContent = "$" + countTip().toFixed(2);
    result[1].textContent = "$" + total().toFixed(2);
  }
});
inputCustom.addEventListener("blur", (event) => {
  if (event.currentTarget.value === "") {
    event.currentTarget.value = "Custom";
  } else {
    inputCustomValue = readValue(event) / 100;
    inputCustom.classList.add("btn-small--active");
    selected = event.currentTarget;
    clearButtons();
    percentageConverted = null;
    countTip();
    total();
    if (countTip()) {
      result[0].textContent = "$" + countTip().toFixed(2);
      result[1].textContent = "$" + total().toFixed(2);
    }
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
    if (countTip()) {
      result[0].textContent = "$" + countTip().toFixed(2);
      result[1].textContent = "$" + total().toFixed(2);
    }
  }
};

// toggle colors and return percentage chosen when button clicked
btnPercentage.forEach((btn) => {
  btn.addEventListener("click", applyPercentage);
});

// function which counts tip amount per person
const countTip = () => {
  if (
    inputBillValue &&
    inputNbrPeopleValue &&
    (inputCustomValue || percentageConverted)
  ) {
    return (
      (inputBillValue / inputNbrPeopleValue) *
      (inputCustomValue ? inputCustomValue : percentageConverted)
    );
  }
};

// function which counts total amount per person
const total = () => {
  if (countTip()) {
    btnReset.removeAttribute("disabled");
    btnReset.classList.add("btn-large--active");
    return inputBillValue / inputNbrPeopleValue + countTip();
  }
};

// reset all data after clicking on the reset button
btnReset.addEventListener("click", () => {
  form.reset();
  clearButtons();
  inputCustom.classList.remove("btn-small--active");
  result.forEach((r) => (r.textContent = "$0.00"));
  btnReset.setAttribute("disabled", "disabled");
  inputBillValue = null;
  inputNbrPeopleValue = null;
  inputCustomValue = null;
  percentageConverted = null;
});

// fonction which removes color from buttons
const clearButtons = () => {
  btnPercentage.forEach((btn) => btn.classList.remove("btn-small--active"));
  btnReset.classList.remove("btn-large--active");
};
