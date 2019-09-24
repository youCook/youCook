const apiHandler = new APIHandler();

window.addEventListener("load", function(e) {
  e.preventDefault();
  apiHandler.getRandomRecipe().then(res => {
    const { data } = res;
    console.log(data);
    document.querySelector("#randomrecipe").innerHTML = "";
    document.querySelector("#randomrecipe").innerHTML = `
    <div><img src="${data.recipes[0].image}" alt="${data.recipes[0].title}"></div>
    <div><h2>Recipe: ${data.recipes[0].title}<h2></div>
    <div>Ready in ${data.recipes[0].readyInMinutes} minutes</div>
    <div>Servings: ${data.recipes[0].servings}</div>
    `;
  });
});
