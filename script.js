"use strict"

const petQtdInput = document.getElementById("pet-quantity");
const checkInDateInput = document.getElementById("checkin-date");
const checkOutDateInput = document.getElementById("checkout-date");
const CalculateBtn = document.getElementById("calculate");

const totalDaysElem = document.getElementById("total-days");
const checkInOutput = document.getElementById("checkin");
const checkOutOutput = document.getElementById("checkout");
const totalCost = document.getElementById("total-cost");
const totalCostDay = document.getElementById("total-cost-day");
const petSizeContainer = document.getElementById("pet-size-container");
let petArray = [];


//functions

const ShowSizeOptions = () => {
  let sizeOptions = "";
  for (let i = 1; i <= petQtdInput.value; i++) {
    sizeOptions += `<br>
        <label for="petSize-${i}">Pet${i} Size:</label>
        <input type="radio" id="petSize-${i}-big" name="petSize-${i}" value="big" required>
        <label for="petSize-${i}-big">Big</label>
        <input type="radio" id="petSize-${i}-small" name="petSize-${i}" value="small" required>
        <label for="petSize-${i}-small">Small</label> <br>
              ` ;
  }
  petSizeContainer.innerHTML = sizeOptions;
}


const petCreate = (name, size, cost) => {
  this.name = name;
  this.size = size;
  this.cost = cost;

  return { name, size, cost }
}

const addPetToArray = () => {
  petArray = [];
  for (let i = 1; i <= petQtdInput.value; i++) {
    let petName = `Pet${i}`
    let petSize = document.querySelector(`input[name="petSize-${i}"]:checked`).value
    let petCost = 0;
    petArray.push(petCreate(petName, petSize, petCost))

  }

}

const setPetCost = () => {
  const checkInDate = new Date(checkInDateInput.value);
  const checkOutDate = new Date(checkOutDateInput.value);
  const totalDays = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
  console.log(petArray)
  console.log(totalDays)

  for (let pet of petArray) {

    if (pet.size === "big") {
      if (totalDays === 1) pet.cost = 75;
      else if (totalDays === 2) pet.cost = 70 * totalDays;
      else if (totalDays > 2 && totalDays < 10) pet.cost = 65 * totalDays;
      else if (totalDays >= 10) pet.cost = 60 * totalDays;
    }
    else if (pet.size === "small") {
      if (totalDays === 1) pet.cost = 65;
      else if (totalDays === 2) pet.cost = 60 * totalDays;
      else if (totalDays > 2 && totalDays < 10) pet.cost = 55 * totalDays;
      else if (totalDays >= 10) pet.cost = 50 * totalDays;
    }

  }
  applyDiscount();
  setTotalCost(checkInDateInput.value, checkOutDateInput.value, totalDays);
}

const setTotalCost = (checkInDate, checkOutDate, totalDays) => {
  let totalCost = 0
  for (let pet of petArray) {
    totalCost += pet.cost;
  }

  const totalPerDay = totalCost / totalDays
  showOutput(checkInDate, checkOutDate, totalDays, totalPerDay, totalCost)

}

const applyDiscount = () => {
  if (petArray.length > 1) {
    petArray.sort((a, b) => (a.size > b.size ? -1 : 1));

    for (let i = 1; i < petArray.length; i++) {
      petArray[i].cost = petArray[i].cost * .9
    }
  }
}


const showOutput = (checkIn, checkOut, totalDays, totalPerDay, totalGlobal) => {
  const formattedCheckin = checkIn.split('-').reverse().join('/');
  const formattedCheckout = checkOut.split('-').reverse().join('/');
  checkInOutput.innerHTML = `Check-in: ${formattedCheckin}`;
  checkOutOutput.innerHTML = `Check-out: ${formattedCheckout}`;
  totalDaysElem.innerHTML = `Total de pernoites: ${totalDays}`;
  totalCostDay.innerHTML = `Total por dia: R$${totalPerDay}`;
  totalCost.innerHTML = `Total Geral: R$${totalGlobal}`;

}

//Events

petQtdInput.addEventListener("change", () => { ShowSizeOptions() })

CalculateBtn.addEventListener("click", (e) => {
  if (petQtdInput.value !== "" && checkInDateInput.value !== "" && checkOutDateInput.value !== "") {
    addPetToArray();
    setPetCost();
    e.preventDefault();
  } else {
    alert("Favor preencher todos os campos");
  }
});
