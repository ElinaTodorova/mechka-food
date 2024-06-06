// Import access to database tables
const tables = require("../tables");

const browse = async (req, res, next) => {
  try {
    // Fetch all items from the database
    const users = await tables.client.readAllUsers();

    // Respond with the items in JSON format
    res.json(users);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  // Extract the user data from the request body
  const dataUser = req.body;
  try {
    // Insert the user into the database

    const user = await tables.client.readByEmail(dataUser.email);
    if (user !== undefined) {
      res.status(400).json("Email déjà utilisé");
    } else {
      const insertId = await tables.client.create(dataUser);
      res.status(201).json({ insertId });
    }

    // Respond with HTTP 201 (Created) and the ID of the newly inserted user
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const deleteById = async (req, res, next) => {
  try {
    // Delete the item from the database
    await tables.client.DeletyeById(req.params.id);

    // Respond with HTTP 204 (No Content)
    res.sendStatus(204);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The D of BREAD - Destroy (Delete) operation
// This operation is not yet implemented

// Ready to export the controller functions
module.exports = {
  add,
  browse,
  deleteById,
};
