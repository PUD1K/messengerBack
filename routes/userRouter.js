const Router = require('express')
const userController = require('../controllers/userController')
const router = new Router()

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/get_by_num/:number', userController.getUserByNumber)
router.get('/get_by_id/:id', userController.getUserById)
router.get('/all', userController.getAllUsers)





module.exports = router