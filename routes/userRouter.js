const router = require('express').Router()
const userCtrl = require('../controllers/userCtrl')
const auth = require('../middleware/auth')

// Register user router
router.post('/register', userCtrl.registerUser)

// Login user router
router.post('/login', userCtrl.loginUser)

//verify Token
router.get('/verify', userCtrl.verifiedToken)











module.exports=router