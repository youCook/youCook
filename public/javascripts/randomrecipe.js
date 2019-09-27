const apiHandler2 = new APIHandler();

window.addEventListener("load", function(e) {
  e.preventDefault();
  apiHandler2.getRandomRecipe().then(res => {
    const { data } = res;
    // console.log(data);
    document.querySelector("#randomrecipe").innerHTML = "";
    document.querySelector("#randomrecipe").innerHTML = `
    <div>
      <img src="${data.recipes[0].image}" alt="${data.recipes[0].title}">
    </div>
    <div>
      <h2>Recipe: ${data.recipes[0].title}<h2>
    </div>
    <div>
      <p>Ready in ${data.recipes[0].readyInMinutes} minutes</p>
    </div>
    <div>
      <p>Servings: ${data.recipes[0].servings}</p>
    </div>
    `;
  });
});
