const express = require("express");
const router = express.Router();
const { userLogin, userSignUp, getUser } = require("../controllers/user_controller"); // <--- fixed path

router.post("/signUp", userSignUp);
router.post("/login", userLogin);
router.get("/user/:id", getUser);

module.exports = router;



// const express = require("express")
// const router = express.Router()
// const { userLogin, userSignUp, getUser } = require("../controller/user")

// router.post("/signUp", userSignUp)
// router.post("/login", userLogin)
// router.get("/user/:id", getUser)

// module.exports = router