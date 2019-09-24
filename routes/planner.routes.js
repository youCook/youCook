require('dotenv').config();
const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get('/', (req, res, next) => {
  res.render('planner/planner', { user: req.user });
});

router.get('/findrecipes', (req, res, next)=>{
  res.render('planner/findrecipes')
})

router.get('/recipesearch/:search', (req, res, next) => {
  console.log("hola")
  axios.get(`https://api.spoonacular.com/recipes/search?query=${req.params.search}&apiKey=${process.env.API_KEY}`)
  .then(response=> {
    console.log(response)
    res.json(response.data)
  })
})


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
  axios.get(`https://api.spoonacular.com/recipes/mealplans/generate/?timeFrame=day${cal}${diet}${allergies}&apiKey=${process.env.API_KEY}`)
  .then(response=> {
    res.json(response.data);
  })
})

router.get("/recipes/:id", (req, res, next) => {
  axios.get(`https://api.spoonacular.com/recipes/search?query=${req.params.id}&apiKey=${process.env.API_KEY}`)
  .then(response=> {
    console.log(response)
    res.json(response.data)
  })
});

router.get("/recipes/instructions/:id", (req, res, next) => {
  console.log("entra")
  axios.get(`https://api.spoonacular.com/recipes/${req.params.id}/analyzedInstructions?apiKey=${process.env.API_KEY}`)
  .then(response=> {
    console.log(response)
    res.json(response.data)
  })
});

router.get("/randomjoke", (req, res, next)=> {
  axios.get(`https://api.spoonacular.com/food/jokes/random?apiKey=${process.env.API_KEY}`)
  .then(response=> {
    res.json(response.data)
  })
})

router.get("/randomrecipe", (req, res, next)=> {
  axios.get(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.API_KEY}`)
  .then(response => {
    res.json(response.data)
  })
})


module.exports = router;