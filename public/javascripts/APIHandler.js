class APIHandler {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  getMealPlanner(cal, diet, allergies) {
    return axios.get(`${this.baseURL}/recipes/mealplans/generate/?timeFrame=day&targetCalories=${cal}&diet=${diet}&exclude=${allergies}&apiKey=8c026d4455174c2b8ae20af4de02d565`);
  }
  getRecipe(id) {
    return axios.get(`${this.baseURL}/recipes/search?query=${id}&apiKey=8c026d4455174c2b8ae20af4de02d565`);
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