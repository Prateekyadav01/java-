
const express = require("express")
const router = express.Router()


const {
  signup,
  login,
  getAllUserDetails,
  deleteAccount,
  update,
} = require("../controllers/Auth.js")






router.post("/create", signup)
router.post("/login", login)
router.get("/get_customer_list", getAllUserDetails)
router.delete("/delete", deleteAccount)
router.put("/update", update)
module.exports = router