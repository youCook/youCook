class APIHandler {
  constructor(baseURL) {
    this.backURL = "http://localhost:3000"
  }

  getMealPlanner(cal, diet, allergies) {
  let calParam= "none",dietParam= "none", allergiesParam= "none";
  if(cal.length) {
    calParam=`${cal}`;
  };
  if(diet.length) {
    dietParam=`${diet}`;
  };
  if(allergies.length) {
    allergiesParam=`${allergies}`;
  };
    return axios.get(`${this.backURL}/planner/search/${calParam}/${dietParam}/${allergiesParam}`)
  }
  getRecipe(id) {
    return axios.get(`${this.backURL}/planner/recipes/search/${id}`);
  }
  getRecipeInstrucctions(id) {
    return axios.get(`${this.backURL}/planner/recipes/instructions/${id}`);
  }
  getRandomJoke() {
    return axios.get(`${this.backURL}/planner/randomjoke`)
  }
  getRandomRecipe(){
    return axios.get(`${this.backURL}/planner/randomrecipe`)
  }
  getRecipeSearch(string){
    return axios.get(`${this.backURL}/planner/recipesearch/${string}`)
  }

}
