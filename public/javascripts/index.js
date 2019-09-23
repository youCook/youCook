const apiHandler = new APIHandler('https://api.spoonacular.com/');
// const apiHandler = new APIHandler('https://ih-crud-api.herokuapp.com/characters');
// const charactersContainer = document.querySelector('#characters-list');
const recipeBox = document.querySelector("#plan-container");

// document.querySelector('#get-characters').onclick = function () {
//   printAllCharacters();
// };
window.addEventListener("load", () => {
  document.getElementById("new-plan").addEventListener("submit", function(e) {
    // document.querySelector('#new-plan').onsubmit = function (e) {
      e.preventDefault();
      const cal = document.querySelector('#cal').value;
      const diet = document.querySelector('#diet').value;
      const allergies = document.querySelector('#allergies').value;
      console.log(cal, diet, allergies);
      apiHandler.getMealPlanner(cal, diet, allergies)
      // apiHandler.getCharacters()
        .then((res) => {
          console.log(res);
            const { data } = res;
            recipeBox.innerHTML = '';
            recipeBox.innerHTML += `
            <h2>Nutrition facts</h2>
            <ul>
            <li>Calories: ${data.nutrients.calories}</li>
            <li>Protein: ${data.nutrients.protein}</li>
            <li>Fat: ${data.nutrients.fat}</li>
            <li>Carbohydrates: ${data.nutrients.carbohydrates}</li>
    
            </ul>
            <li>
            <div class="breakfast">
            <div class="title">Recipe: ${data.meals[0].title}</div>
            <div class="ready">Ready in  ${data.meals[0].readyInMinutes} minutes</div>
            <div class="imageUrl"><img src="${data.meals[0].imageUrls}" alt="breakfast image"</div>
            <div class="servings">Character servings: ${data.meals[0].servings}</div>
            </div>
            </li>
            <li>
            <div class="Lunch">
            <div class="title">Recipe: ${data.meals[1].title}</div>
            <div class="ready">Ready in  ${data.meals[1].readyInMinutes} minutes</div>
            <div class="imageUrl"><img src="${data.meals[1].imageUrls}" alt="breakfast image"</div>
            <div class="servings">Character servings: ${data.meals[1].servings}</div>
            </div>
            </li>
            <li>
            <div class="dinner">
            <div class="title">Recipe: ${data.meals[2].title}</div>
            <div class="ready">Ready in  ${data.meals[2].readyInMinutes} minutes</div>
            <div class="imageUrl"><img src="${data.meals[2].imageUrls}" alt="breakfast image"</div>
            <div class="servings">Character servings: ${data.meals[2].servings}</div>
            </div>
            </li>
            `;
        })
        .catch(error => console.error(error));
    ;
  })
})

