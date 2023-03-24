const express = require("express");
const router = express.Router();
const {
  getUsers,
  updateUser,
  addUser,
  deleteUser,
} = require("../controllers/controllers");

router.get("/users", getUsers);
router.post("/users", addUser);
router.delete("/users/:id", deleteUser);
router.put("/users/:id", updateUser);

module.exports = router;
