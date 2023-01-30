"use strict"

const petQtdInput = document.getElementById("pet-quantity");
const checkInDateInput = document.getElementById("checkin-date");
const checkOutDateInput = document.getElementById("checkout-date");
const NextBtn = document.getElementById("next");
const CalculateBtn = document.getElementById("calculate");

const totalDaysElem = document.getElementById("total-days");
const CostPetElem = document.getElementById("total-cost-pet");
const totalCost= document.getElementById("total-cost");
const petSizeContainer = document.getElementById("pet-size-container");
const petArray = [];


NextBtn.addEventListener("click", () => ShowSizeOptions())
CalculateBtn.addEventListener("click", (e) => {
  e.preventDefault();
  addPetToArray();
  PetCostCalc();
})

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


const PetCreate = (name, size, cost) => {
  this.name = name;
  this.size = size;
  this.cost = cost;

  return { name, size, cost }
}

const addPetToArray = () => {
  for (let i = 1; i <= petQtdInput.value; i++) {
    let petName = `Pet${i}`
    let petSize = document.querySelector(`input[name="petSize-${i}"]:checked`).value
    petArray.push(PetCreate(petName, petSize))
  }
}



const PetCostCalc = () => {
  const checkInDate = new Date(checkInDateInput.value);
  const checkOutDate = new Date(checkOutDateInput.value);
  const totalDays = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
  totalDaysElem.innerHTML = `Total de pernoites: ${totalDays}`;

  for (let pet of petArray) {

    if (pet.size === "big") {
      pet.cost = 75;
      if (totalDays === 2) {
        pet.cost = 70 * totalDays;
      } else if (totalDays > 2 && totalDays < 10) {
        pet.cost = 65 * totalDays;
      } else if (totalDays >= 10) {
        pet.cost = 60 * totalDays;
      }
    } else {
      pet.cost = 65;
      if (totalDays === 2) {
        pet.cost = 60 * totalDays;
      } else if (totalDays > 2 && totalDays < 10) {
        pet.cost = 55 * totalDays;
      } else if (totalDays >= 10) {
        pet.cost = 50 * totalDays;
      }
    }
  }
  console.log(petArray)
  GetDiscount();
}

const GetDiscount = () => {
  if (petArray.length > 1) {
    petArray.sort((a, b) => (a.size > b.size ? -1 : 1));

    for (let i = 0; i < petArray.length; i++) {
      petArray[i].cost = petArray[i].cost * .9
    }
    console.log(petArray)
  }
  else return petArray

}
 




