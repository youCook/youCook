const apiHandler = new APIHandler();

const recipeBox = document.querySelector("#plan-container");
const recipeContainer = document.querySelector("#recipe-plan-container");

// window.onload(() => {
document.getElementById("new-plan").addEventListener("submit", function(e) {
  e.preventDefault();
  const cal = document.querySelector("#cal").value;
  const diet = document.querySelector("#diet").value;
  const allergies = document.querySelector("#allergies").value;
  apiHandler
    .getMealPlanner(cal, diet, allergies)

    .then(res => {
      // then((res)=>{

      // })
      const { data } = res;
      recipeBox.innerHTML = "";
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
            <h3>Breakfast</h3>
            <div id="breakfast-recipe-link">Recipe: ${data.meals[0].title}</div>
            <div class="ready">Ready in  ${data.meals[0].readyInMinutes} minutes</div>
            <div class="servings">Character servings: ${data.meals[0].servings}</div>
            <div class="imageUrl"><img src="https://spoonacular.com/recipeImages/${data.meals[0].id}-240x150.jpg" alt="breakfast image"></div>
            <input type="hidden" id="breakfast-id-link" value="${data.meals[0].id}">
            <input type="hidden" id="breakfast-id-name" value="${data.meals[0].title}">
            </div>
            </li>
            <li>
            <div class="lunch">
            <h3>Lunch</h3>
            <div id="lunch-recipe-link">Recipe: ${data.meals[1].title}</div>
            <div class="ready">Ready in  ${data.meals[1].readyInMinutes} minutes</div>
            <div class="servings">Character servings: ${data.meals[1].servings}</div>
            <div class="imageUrl"><img src="https://spoonacular.com/recipeImages/${data.meals[1].id}-240x150.jpg" alt="breakfast image"></div>
            <input type="hidden" id="lunch-id-link" value="${data.meals[1].id}">
            <input type="hidden" id="lunch-id-name" value="${data.meals[1].title}">
            </div>
            </li>
            <li>
            <div class="dinner">
            <h3>Dinner</h3>
            <div id="dinner-recipe-link">Recipe: ${data.meals[2].title}</div>
            <div class="ready">Ready in  ${data.meals[2].readyInMinutes} minutes</div>
            <div class="servings">Character servings: ${data.meals[2].servings}</div>
            <div class="imageUrl"><img src="https://spoonacular.com/recipeImages/${data.meals[2].id}-240x150.jpg" alt="breakfast image"></div>
            <input type="hidden" id="dinner-id-link" value="${data.meals[2].id}">
            <input type="hidden" id="dinner-id-name" value="${data.meals[2].title}">
            </div>
            </li>
            `;

      document.querySelector("#breakfast-recipe-link").onclick = function() {
        const id = document.querySelector("#breakfast-id-link").value;
        const name = document.querySelector("#breakfast-id-name").value;
        apiHandler.getRecipeInstrucctions(id).then(res => {
          const { data } = res;
          recipeContainer.innerHTML = "";
          recipeContainer.innerHTML += `
          <h3>${name}</h3>
          <h2>Steps</h2>
          <ol id="steps-container"></ol>
          `;

          const stepsContainer = document.querySelector("#steps-container");
          // let container=0;
          data[0].steps.forEach(steps => {
            // console.log(steps);
            stepsContainer.innerHTML += `
            <li>
            <p>${steps.step}</p>
            </ul>
            </li>
            `;
            // <ul class="ingredients-container-${container}">
            //   const ingredientsContainer = document.querySelector(`#ingredients-container-${container}`);
            //   steps.ingredients.forEach(ingredient => {
            //     console.log(ingredient);

            //     ingredientsContainer.innerHTML += `
            //     <li>${ingredient.name}</li>
            //   `;

            //   });
            //  container++;
          });
        });
      };
      document.querySelector("#lunch-recipe-link").onclick = function() {
        const id = document.querySelector("#lunch-id-link").value;
        const name = document.querySelector("#lunch-id-name").value;
        apiHandler.getRecipeInstrucctions(id).then(res => {
          const { data } = res;
          recipeContainer.innerHTML = "";
          recipeContainer.innerHTML += `
          <h3>${name}</h3>
          <h2>Steps</h2>
          <ol id="steps-container"></ol>
          `;

          const stepsContainer = document.querySelector("#steps-container");
          data[0].steps.forEach(steps => {
            stepsContainer.innerHTML += `
            <li>
            <p>${steps.step}</p>
            </ul>
            </li>
            `;
          });
        });
      };
      document.querySelector("#dinner-recipe-link").onclick = function() {
        const id = document.querySelector("#dinner-id-link").value;
        const name = document.querySelector("#dinner-id-name").value;
        apiHandler.getRecipeInstrucctions(id).then(res => {
          const { data } = res;
          recipeContainer.innerHTML = "";
          recipeContainer.innerHTML += `
          <h3>${name}</h3>
          <h2>Steps</h2>
          <ol id="steps-container"></ol>
          `;

          const stepsContainer = document.querySelector("#steps-container");
          data[0].steps.forEach(steps => {
            stepsContainer.innerHTML += `
            <li>
            <p>${steps.step}</p>
            </ul>
            </li>
            `;
          });
        });
      };
    })
    .catch(error => console.error(error));
});


