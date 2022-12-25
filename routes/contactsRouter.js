const Router = require('express')
const contactController = require('../controllers/contactController')
const router = new Router()

router.post('/add', contactController.add)
router.delete('/remove', contactController.removeContact)
router.get('/:id', contactController.getContacts)


module.exports = router