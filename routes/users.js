const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  createUsers,
  updateUsers,
  deleteUsers,
} = require("../controllers/controllerUsers");

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/", createUsers);
router.put("/:id", updateUsers);
router.delete("/:id", deleteUsers);
module.exports = router;
