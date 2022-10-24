const inputBill = document.querySelector("#bill");
const inputCustom = document.querySelector("#custom");
const inputNbrPeople = document.querySelector("#nbr-people");
const inputStandard = document.querySelectorAll(".input-standard");
const btnPercentage = document.querySelectorAll(".btn-small");
const btnReset = document.querySelector(".btn-large");
const result = document.querySelectorAll(
  ".result > div > div > span:nth-child(2)"
);
const form = document.querySelector("form");

let inputBillValue;
let inputNbrPeopleValue;
let inputCustomValue;
let btnPercentageValue;
let selected = null; // selected element among small buttons and custom's input

// function which empties input field
const emptyInput = (input) => (input.value = "");

// empty imput field when clicked
inputCustom.addEventListener("click", () => emptyInput(inputCustom));
inputBill.addEventListener("click", () => emptyInput(inputBill));
inputNbrPeople.addEventListener("click", () => emptyInput(inputNbrPeople));

// function which displays error message when input field non valid
const checkValidity = (inputField) => {
  if (!inputField.validity.valid) {
    inputField.parentElement.setAttribute("data-error-visible", "true");
  } else {
    inputField.parentElement.setAttribute("data-error-visible", "false");
  }
};

// function which reads and converts the input value and assign it to a var
const readInputValue = (eCurrTarget) => {
  let value = eCurrTarget.value;
  value = Number.parseInt(value, 10);
  if (eCurrTarget === inputBill) inputBillValue = value;
  if (eCurrTarget === inputNbrPeople) inputNbrPeopleValue = value;
  if (eCurrTarget === inputCustom) {
    inputCustomValue = value / 100;
    if (!inputCustom.value.includes("%")) {
      inputCustom.value += "%";
    }
  }
};

// function which reads and converts the button value
const readBtnValue = (eCurrTarget) => {
  let value = eCurrTarget.textContent;
  let indexP = value.lastIndexOf("%");
  value = value.slice(0, indexP);
  value = Number.parseInt(value) / 100;
  btnPercentageValue = value;
};

// function which counts tip amount per person
const countTip = () => {
  if (
    inputBillValue &&
    inputNbrPeopleValue &&
    (inputCustomValue || btnPercentageValue)
  ) {
    return (
      (inputBillValue / inputNbrPeopleValue) *
      (inputCustomValue ? inputCustomValue : btnPercentageValue)
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

// function which displays result
const displayResult = () => {
  if (countTip()) {
    result[0].textContent = "$" + countTip().toFixed(2);
    result[1].textContent = "$" + total().toFixed(2);
  }
};

// function which toggles button's colors and reads percentage chosen
const applyPercentage = (e) => {
  selected?.classList.remove("btn-small--active");
  if (selected === e.currentTarget) {
    selected = null;
  } else {
    selected = e.currentTarget;
    readBtnValue(selected);
    selected.classList.add("btn-small--active");
    inputCustomValue = null;
    inputCustom.value = "Custom";
    displayResult();
  }
};

// toggle colors and return percentage chosen when button clicked
btnPercentage.forEach((btn) => {
  btn.addEventListener("click", applyPercentage);
});

// function which removes active color from small buttons
const clearButtons = () => {
  btnPercentage.forEach((btn) => btn.classList.remove("btn-small--active"));
};

// function which reads value, displays error, displays result
const inputOperations = (e) => {
  checkValidity(e.currentTarget);
  readInputValue(e.currentTarget);
  displayResult();
};
// display error message (when needed) and displays result when input loses focus
inputStandard.forEach((input) =>
  input.addEventListener("blur", inputOperations)
);
inputCustom.addEventListener("blur", () => {
  if (inputCustom.value === "" || inputCustom.value === "0") {
    inputCustom.value = "Custom";
    inputCustom.classList.remove("btn-small--active");
  } else {
    selected = inputCustom;
    readInputValue(selected);
    selected.classList.add("btn-small--active");
    btnPercentageValue = null;
    clearButtons();
    displayResult();
  }
});

// reset all data after clicking on the reset button
btnReset.addEventListener("click", () => {
  form.reset();
  clearButtons();
  inputCustom.classList.remove("btn-small--active");
  btnReset.classList.remove("btn-large--active");
  result.forEach((r) => (r.textContent = "$0.00"));
  btnReset.setAttribute("disabled", "disabled");
  inputBillValue = null;
  inputNbrPeopleValue = null;
  inputCustomValue = null;
  btnPercentageValue = null;
  selected = null;
});
