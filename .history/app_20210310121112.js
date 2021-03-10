// this is for the controllers (button)
const search = document.getElementById("search");
const randomBtn = document.getElementById("random");
const submit = document.getElementById("submit");

// for the meals

const meals = document.getElementById("meals");
const resultHeading = document.getElementById("result-heading");
const singleMeal = document.getElementById("single-meal");

// Event Listener
submit.addEventListener("submit", searchMeal);

// lets create the SearchMeal

function searchMeal(e) {
  e.preventDefault();

  // the input search value
  const item = search.value;

  if(item.trim()){

  }else{
    alert('what ')
  }
  
  
}
