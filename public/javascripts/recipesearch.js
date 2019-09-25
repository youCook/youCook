const apiHandler = new APIHandler();

document.getElementById('findrecipe').addEventListener("submit", function(e) {
  e.preventDefault();
  const search = document.querySelector("#recipesearch").value
  // console.log(search)
  apiHandler.getRecipeSearch(search)
    .then(res => {
    const { data } = res;
    const searchResults = document.querySelector("#searchresults")

      data.results.forEach(recipe => {
        searchResults.innerHTML += `
        <div><img src="https://spoonacular.com/recipeImages/${recipe.id}-240x150.jpg" alt="${recipe.title}"></div>
        <div><h2>Recipe: ${recipe.title}<h2></div>
        <div>Ready in ${recipe.readyInMinutes} minutes</div>
        <div>Servings: ${recipe.servings}</div>
        `;
        
      });
    
  });
});
