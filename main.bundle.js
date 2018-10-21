/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

	'use strict';

	var baseUrl = 'https://quantified-self-express-be.herokuapp.com';

	var handleResponse = function handleResponse(response) {
	  return response.json().then(function (json) {
	    if (!response.ok) {
	      var error = {
	        status: response.status,
	        statusText: response.statusText,
	        json: json
	      };
	      return Promise.reject(error);
	    }
	    return json;
	  });
	};

	var errorLog = function errorLog(error) {
	  console.error({ error: error });
	};

	var getFoods = function getFoods() {
	  $('#foodInfo').html('');
	  fetch(baseUrl + '/api/v1/foods').then(handleResponse).then(getEachFood).catch(errorLog);
	};

	var getEachFood = function getEachFood(foods) {
	  return foods.forEach(function (food) {
	    appendFood(food);
	  });
	};

	var appendFood = function appendFood(food) {
	  $('#foods > tbody:last-child').append('\n    <tr>\n      <td id=' + food.id + ' class="name">' + food.name + '</td>\n      <td id=' + food.id + ' class="calories">' + food.calories + '</td>\n      <td class="food-btns"><button type="button" id=' + food.id + ' class="removeFood-btn">Remove</button>\n      <button type="button" id=' + food.id + ' class="showEditForm-btn">Edit</button></td>\n    </tr>\n    ');
	};

	var removeFood = function removeFood(event) {
	  event.target.parentNode.parentNode.remove();
	  deleteFood(event.target.id);
	};

	var deleteFood = function deleteFood(foodId) {
	  fetch(baseUrl + '/api/v1/foods/' + foodId, { method: 'DELETE' }).catch(errorLog);
	};

	var addNewFood = function addNewFood(event) {
	  event.preventDefault();
	  var name = $('#nameField').val();
	  var calories = $('#caloriesField').val();

	  postNewFood({ food: { name: '' + name, calories: '' + calories } });
	  $('#nameField').val('');
	  $('#caloriesField').val('');
	};

	var postNewFood = function postNewFood(newFoodInfo) {
	  fetch(baseUrl + '/api/v1/foods', newFoodPayload(newFoodInfo)).then(handleResponse).then(getFoods).catch(errorLog);
	};

	var newFoodPayload = function newFoodPayload(body) {
	  return {
	    method: 'POST',
	    headers: { 'Content-Type': 'application/json' },
	    body: JSON.stringify(body)
	  };
	};

	var updateFood = function updateFood(event) {
	  event.preventDefault();
	  var name = $('#editNameField').val();
	  var calories = $('#editCaloriesField').val();

	  patchFood({ food: { name: '' + name, calories: '' + calories } });

	  foodName = $('.name#' + foodId).text('' + name);
	  foodCalories = $('#' + foodId + '.calories').text('' + calories);
	  resetEditForm();
	};

	var resetEditForm = function resetEditForm() {
	  $('#editNameField').val('');
	  $('#editCaloriesField').val('');
	  $('#edit-food-form').hide();
	};

	var patchFood = function patchFood(editedFoodInfo) {
	  fetch(baseUrl + '/api/v1/foods/' + foodId, editFoodPayload(editedFoodInfo)).then(handleResponse).catch(errorLog);
	};

	var editFoodPayload = function editFoodPayload(body) {
	  return {
	    method: 'PATCH',
	    headers: { 'Content-Type': 'application/json' },
	    body: JSON.stringify(body)
	  };
	};

	var showEditForm = function showEditForm(event) {
	  foodId = event.target.id;
	  foodName = $('.name#' + foodId).text();
	  foodCalories = $('#' + foodId + '.calories').text();
	  $('#editNameField').val(foodName);
	  $('#editCaloriesField').val(foodCalories);
	  $('#editTitle').html('Edit ' + foodName);
	  $('#edit-food-form').show();
	};

	getFoods();

	var foodId = void 0;
	var foodName = void 0;
	var foodCalories = void 0;

	$('#addFood-btn').on('click', addNewFood);
	$('#foods').on('click', '.removeFood-btn', removeFood);
	$('#foods').on('click', '.showEditForm-btn', showEditForm);
	$('#editFood-btn').on('click', updateFood);

/***/ })
/******/ ]);