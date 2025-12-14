const router = require("express").Router();
const auth = require("../middleware/authmiddleware");
const userC=require('../controllers/usercontroller')


router.post("/:id/follow", auth, userC.toggleFollow);
router.get("/:id/profile", auth, userC.getUserProfile);

router.get('/allusers',auth,userC.alluser);




module.exports = router;