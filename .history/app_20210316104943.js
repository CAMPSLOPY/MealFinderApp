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
        // we have received the api data here and then incorporate our local workflow with it..;
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

mealsEl.addEventListener("click", (e) => {
  const mealInfo = e.path.find((item) => {
    if (item.classList) {
      return item.classList.contains("meal-info");
    } else {
      return false;
    }
  });
  if (mealInfo) {
    const mealID = mealInfo.getAttribute("data-mealid");
    getMealById(mealID);
  }
});

// Fetch meal Api by ID

function getMealById(mealID) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals[0];

      addMealToDom(meal);
    });
}

function addMealToDom(meal) {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(`${meal[`strIngredient`]}`);
    } else {
      break;
    }
  }
  // .join()-converts all the returned results to strings
  singleMeal.innerHTML = `<div class="single-meal">
    <h1>${meal.strMeal}</h1>
    <img src="${meal.strMealThumb}" />
    <div class="single-meal-info">
  ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ""}
  ${meal.strArea ? `<p>${meal.strArea}</p>` : ""}
    </div>
    <div class="main">
      <p>${meal.strInstructions}</p>  
      <h2>ingredients</h2>
      <ul>
        ${ingredients.map((ing) => `<li>${ing}</li>`).join("")}
      </ul>
    </div>
  </div>`;
}
// The Random meal generator
randomBtn.addEventListener("click", randomMeal);

// fetch random Meal API

function randomMeal() {
  // clear meals and headings
  mealsEl.innerHTML = "";
  resultHeading.innerHTML = "";
  fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals[0];

      addMealToDom(meal);
    });
}
