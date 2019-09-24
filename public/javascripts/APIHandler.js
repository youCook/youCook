class APIHandler {
  constructor(baseURL) {
    this.baseURL = baseURL;
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
  


    return 
    // return axios.get(`${this.baseURL}/recipes/mealplans/generate/?timeFrame=day&targetCalories=${cal}&diet=${diet}&exclude=${allergies}&apiKey=8c026d4455174c2b8ae20af4de02d565`);
  }
  getRecipe(id) {
    return axios.get(`${this.baseURL}/recipes/search?query=${id}&apiKey=8c026d4455174c2b8ae20af4de02d565`);
    // return axios.get(`${this.baseURL}/recipes/search?query=${id}&apiKey=8c026d4455174c2b8ae20af4de02d565`);
  }
  getRecipeInstrucctions(id) {
    return axios.get(`${this.baseURL}/recipes/${id}/analyzedInstructions?apiKey=8c026d4455174c2b8ae20af4de02d565`);
  }

  // getCharacters() {
  //   return axios.get(`${this.baseURL}`);
  // }

  // getCharacterById(id) {
  //   return axios.get(`${this.baseURL}/${id}`);
  // }

  // createCharacter(character) {
  //   return axios.post(`${this.baseURL}`, character);
  // }

  // updateCharacter(id, character) {
  //   return axios.put(`${this.baseURL}/${id}`, character);
  // }

  // deleteCharacter(id) {
  //   return axios.delete(`${this.baseURL}/${id}`);
  // }
}

// 
// }