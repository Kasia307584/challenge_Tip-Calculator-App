const inputBill = document.querySelector("#bill");
const inputCustom = document.querySelector("#custom");
const inputNbrPeople = document.querySelector("#nbr-people");
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

// function which reads and converts the input value
const readInputValue = (event) => {
  let value = event.currentTarget.value;
  value = Number.parseInt(value, 10);
  return value;
};

// function which reads and converts the button value
const readBtnValue = (event) => {
  let value = event.currentTarget.textContent;
  let indexP = value.lastIndexOf("%");
  value = value.slice(0, indexP);
  value = Number.parseInt(value) / 100;
  return value;
};

// function which removes active color from small buttons
const clearButtons = () => {
  btnPercentage.forEach((btn) => btn.classList.remove("btn-small--active"));
};

// display error message (when needed) and read input value when input loses focus
inputBill.addEventListener("blur", (event) => {
  checkValidity(inputBill);
  inputBillValue = readInputValue(event);
  countTip();
  total();
  if (countTip()) {
    result[0].textContent = "$" + countTip().toFixed(2);
    result[1].textContent = "$" + total().toFixed(2);
  }
});
inputNbrPeople.addEventListener("blur", (event) => {
  checkValidity(inputNbrPeople);
  inputNbrPeopleValue = readInputValue(event);
  countTip();
  total();
  if (countTip()) {
    result[0].textContent = "$" + countTip().toFixed(2);
    result[1].textContent = "$" + total().toFixed(2);
  }
});
inputCustom.addEventListener("blur", (event) => {
  if (inputCustom.value === "" || inputCustom.value === "0") {
    inputCustom.value = "Custom";
    inputCustom.classList.remove("btn-small--active");
  } else {
    inputCustomValue = readInputValue(event) / 100;
    inputCustom.classList.add("btn-small--active");
    selected = event.currentTarget;
    clearButtons();
    btnPercentageValue = null;
    countTip();
    total();
    if (countTip()) {
      result[0].textContent = "$" + countTip().toFixed(2);
      result[1].textContent = "$" + total().toFixed(2);
    }
  }
});

// function which toggles button's colors and reads percentage chosen
const applyPercentage = (e) => {
  selected?.classList.remove("btn-small--active");
  if (selected === e.currentTarget) {
    selected = null;
  } else {
    selected = e.currentTarget;
    selected.classList.add("btn-small--active");
    inputCustom.value = "Custom";
    btnPercentageValue = readBtnValue(e);
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
});
