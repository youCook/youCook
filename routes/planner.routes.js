require('dotenv').config();
const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get('/', (req, res, next) => {
  res.render('planner/search', { user: req.user });
});


router.get("/search/:cal/:diet/:allergies", (req, res, next) => {
  let cal="", diet="", allergies="";
  if(req.params.cal!="none") {
    cal= `&targetCalories=${req.params.cal}`
  }
  if(req.params.diet != "none"){
    diet= `&diet=${req.params.diet}`
  }
  if(req.params.allergies !="none") {
    allergies=`&exclude=${req.params.allergies}`
  }
  axios.get(`https://api.spoonacular.com/recipes/mealplans/generate/?timeFrame=day${cal}${diet}${allergies}&apiKey=8c026d4455174c2b8ae20af4de02d565`)
  // axios.get(`https://api.spoonacular.com/recipes/mealplans/generate/?timeFrame=day&targetCalories=${cal}&diet=${req.params.diet}&exclude=${req.params.allergies}&apiKey=8c026d4455174c2b8ae20af4de02d565`)
  .then(response=> {
    console.log(response)
    res.json(response.data);
  })
})




module.exports = router;