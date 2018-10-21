/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./lib/foods.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/foods.js":
/*!**********************!*\
  !*** ./lib/foods.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("let baseUrl = 'https://quantified-self-express-be.herokuapp.com'\n\nconst handleResponse = (response) => {\n  return response.json()\n    .then((json) => {\n      if (!response.ok) {\n        const error = {\n          status: response.status,\n          statusText: response.statusText,\n          json\n        }\n        return Promise.reject(error)\n      }\n      return json\n    })\n}\n\nconst errorLog = (error) => {\n  console.error({ error })\n}\n\nconst getFoods = () => {\n  $('#foodInfo').html('')\n  fetch(`${baseUrl}/api/v1/foods`)\n    .then(handleResponse)\n    .then(getEachFood)\n    .catch(errorLog)\n}\n\nconst getEachFood = (foods) => {\n  return foods.forEach((food) => {\n    appendFood(food)\n  })\n}\n\nconst appendFood = (food) => {\n  $('#foods > tbody:last-child').append(`\n    <tr>\n      <td id=${food.id} class=\"name\">${food.name}</td>\n      <td id=${food.id} class=\"calories\">${food.calories}</td>\n      <td class=\"food-btns\"><button type=\"button\" id=${food.id} class=\"removeFood-btn\">Remove</button>\n      <button type=\"button\" id=${food.id} class=\"showEditForm-btn\">Edit</button></td>\n    </tr>\n    `)\n}\n\nconst removeFood = (event) => {\n  event.target.parentNode.parentNode.remove()\n  deleteFood(event.target.id)\n}\n\nconst deleteFood = (foodId) => {\n  fetch(`${baseUrl}/api/v1/foods/${foodId}`, { method: 'DELETE' })\n    .catch(errorLog)\n}\n\nconst addNewFood = (event) => {\n  event.preventDefault()\n  let name = $('#nameField').val()\n  let calories = $('#caloriesField').val()\n\n  postNewFood({ food: { name: `${name}`, calories: `${calories}` } })\n  $('#nameField').val('')\n  $('#caloriesField').val('')\n}\n\nconst postNewFood = (newFoodInfo) => {\n  fetch(`${baseUrl}/api/v1/foods`, newFoodPayload(newFoodInfo))\n    .then(handleResponse)\n    .then(getFoods)\n    .catch(errorLog)\n}\n\nconst newFoodPayload = (body) => {\n  return {\n    method: 'POST',\n    headers: { 'Content-Type': 'application/json' },\n    body: JSON.stringify(body)\n  }\n}\n\nconst updateFood = (event) => {\n  event.preventDefault()\n  let name = $('#editNameField').val()\n  let calories = $('#editCaloriesField').val()\n\n  patchFood({ food: { name: `${name}`, calories: `${calories}` } })\n\n  foodName = $(`.name#${foodId}`).text(`${name}`)\n  foodCalories = $(`#${foodId}.calories`).text(`${calories}`)\n  resetEditForm()\n}\n\nconst resetEditForm = () => {\n  $('#editNameField').val('')\n  $('#editCaloriesField').val('')\n  $('#edit-food-form').hide()\n}\n\nconst patchFood = (editedFoodInfo) => {\n  fetch(`${baseUrl}/api/v1/foods/${foodId}`, editFoodPayload(editedFoodInfo))\n    .then(handleResponse)\n    .catch(errorLog)\n}\n\nconst editFoodPayload = (body) => {\n  return {\n    method: 'PATCH',\n    headers: { 'Content-Type': 'application/json' },\n    body: JSON.stringify(body)\n  }\n}\n\nconst showEditForm = (event) => {\n  foodId = event.target.id\n  foodName = $(`.name#${foodId}`).text()\n  foodCalories = $(`#${foodId}.calories`).text()\n  $('#editNameField').val(foodName)\n  $('#editCaloriesField').val(foodCalories)\n  $('#editTitle').html(`Edit ${foodName}`)\n  $('#edit-food-form').show()\n}\n\ngetFoods()\n\nlet foodId\nlet foodName\nlet foodCalories\n\n$('#addFood-btn').on('click', addNewFood)\n$('#foods').on('click', '.removeFood-btn', removeFood)\n$('#foods').on('click', '.showEditForm-btn', showEditForm)\n$('#editFood-btn').on('click', updateFood)\n\n\n//# sourceURL=webpack:///./lib/foods.js?");

/***/ })

/******/ });