const app =require('express');
const router =app.Router();
const {
    register
    ,registerValiations,
    login,
    LoginValiations

} =require('../controllers/userController')


router.post("/register",registerValiations,register);
router.post("/login",LoginValiations,login);

module.exports = router;