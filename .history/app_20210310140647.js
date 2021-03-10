// this is for the controllers (button)
const search = document.getElementById("search");
const randomBtn = document.getElementById("random");
const submit = document.getElementById("submit");

// for the meals

const mealsEl = document.getElementById("meals");
const resultHeading = document.getElementById("result-heading");
const singleMeal = document.getElementById("single-meal");

// Event Listener
submit.addEventListener("submit", searchMeal);

// lets create the SearchMeal

function searchMeal(e) {
  e.preventDefault();

  // the input search value
  const item = search.value;

  if (item.trim()) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${item}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        resultHeading.innerHTML = `<h2>Search results for '${item}':</h2>`;
        if (data.meals === null) {
          resultHeading.innerHTML =
            "<p>There are no meals. Please Try again!</p>";
        } else {
          mealsEl.innerHTML = data.meals
            .map(
              (meal) =>
                `<div class="meal">
         <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
         <div class= "meal-info" data-mealID="${meal.idMeal}">
         <h3>${meal.strMeal}</h3>
         </div>
          </div>
          `
            )
            .join("");
        }
      });
    // clear the search text
    search.value = "";
  } else {
    alert("what did you just do!!!!");
  }
}

meal