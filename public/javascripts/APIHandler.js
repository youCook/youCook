require('dotenv').config();
class APIHandler {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  getMealPlanner(cal, diet, allergies) {
    return axios.get(`${this.baseURL}/recipes/mealplans/generate/?timeFrame=day&targetCalories=${cal}&diet=${diet}&exclude=${allergies}&apiKey=${process.env.API_KEY}`);
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