const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const contactsRouter = require('./contactsRouter')
const messagesRouter = require('./messagesRouter')

router.use('/user', userRouter)
router.use('/contacts', contactsRouter)
router.use('/messages', messagesRouter)

module.exports = router