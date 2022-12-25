const Router = require('express')
var messagesController = require('../controllers/messagesController')
const router = new Router()

router.post('/add', messagesController.add)
router.post('/get', messagesController.get)

module.exports = router