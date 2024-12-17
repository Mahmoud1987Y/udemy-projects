const {Router} = require('express');
const { getUsers,login,register } = require('../controllers/users-controller');


const router = Router()

router.get('/',getUsers)
router.post('/login',login)
router.post('/register',register)

module.exports=router;