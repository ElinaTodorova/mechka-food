const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import itemControllers module for handling item-related operations
const itemControllers = require("./controllers/itemControllers");
const recipeControllers = require("./controllers/recipeControllers");
const ingredientControllers = require("./controllers/ingredientControllers");
const instructionControllers = require("./controllers/instructionControllers");
const categoryControllers = require("./controllers/categoryControllers");

// Route to get a list of items
router.get("/items", itemControllers.browse);
router.get("/recipes", recipeControllers.browse);

// Route to get a specific item by ID
router.get("/items/:id", itemControllers.read);
router.get("/recipes/:id", recipeControllers.readById);
router.get("/recipes/ingredients/:id", ingredientControllers.readById);
router.get("/recipes/instructions/:id", instructionControllers.readById);
router.get("/category", categoryControllers.browse);
router.get("/category/:id", categoryControllers.readById);

// Route to add a new item
router.post("/items", itemControllers.add);

/* ************************************************************************* */

module.exports = router;
