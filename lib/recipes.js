let baseUrl = 'https://quantified-self-express-be.herokuapp.com'

const getFoods = () => {
  fetch(`${baseUrl}/api/v1/foods`)
    .then(response => response.json())
    .then(foods => appendFoods(foods))
    .catch(error => console.error({
      error
    }))
}

const appendFoods = (foods) => {
  foods.forEach(food => {
    appendFood(food)
  })
}

const appendFood = (food) => {
  $('#all-foods').append(`
    <tr>
      <td class="checkbox" id=${food.id}><input type="checkbox"></td>
      <td class="name">${food.name}</td>
      <td class="calories">${food.calories}</td>
    </tr>
  `)
}

const generateRecipes = () => {
  createRecipeTable()
  let endpoint = 'https://api.yummly.com/v1/api/recipes?_app_id=0abefa69&_app_key=7187e41369f5ac5e128f3cafc3f81070&'
  let selectedFoods = getSelectedFoods()
  selectedFoods.forEach(function (foodName) {
    endpoint += `allowedIngredient[]=${foodName}&`
  })
  fetchRecipes(endpoint)
}

const fetchRecipes = (endpoint) => {
  fetch(endpoint)
    .then(response => response.json())
    .then(recipes => appendRecipes(recipes))
    .catch(error => console.error({
      error
    }))
}

const createRecipeTable = () => {
  $('#yummly-logo').remove()
  $('#recipes-table thead').remove()
  $('#recipes-table tbody').empty()
  $('#recipes-table').append(`
  <thead>
    <tr>
      <th>Image</th>
      <th>Recipe</th>
      <th>Source</th>
      <th>Rating</th>
    </tr>
  </thead>
  `)
}

const getSelectedFoods = () => {
  let selectedFoods = []
  $('#all-foods').find('input[type="checkbox"]:checked').each(function (index, row) {
    let elements = row.parentNode.parentNode.querySelectorAll('td')
    let foodName = elements[1].innerHTML.toLowerCase()
    selectedFoods.push(foodName)
  })
  return selectedFoods
}

const appendRecipes = (recipes) => {
  let yummlyHTML = recipes.attribution.html
  let matchingRecipes = recipes.matches
  matchingRecipes.forEach(recipe => {
    appendRecipe(recipe)
  })
  $('#recipes-table').append(`
    <div id="yummly-logo">${yummlyHTML}</div>
    `)
}

const appendRecipe = (recipe) => {
  let recipeId = recipe.id
  $('#recipes-table tbody').append(`
    <tr>
      <td id="recipe-image"><img src=${recipe.smallImageUrls.pop()} alt="food"></td>
      <td><a href=https://www.yummly.com/recipe/${recipeId} target="_blank">${recipe.recipeName}</a></td>
      <td>${recipe.sourceDisplayName}</td>
      <td class="recipe-rating">${recipe.rating}</td>
    </tr>
  `)
}

$('#generate-recipes-button').click(generateRecipes)

getFoods()
