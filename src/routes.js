const express = require('express')

const multerConfig = require('./config/multer')
const upload = require('multer')(multerConfig)

const routes = express.Router()

const authMiddleware = require('./app/middlewares/auth')
const flashMiddleware = require('./app/middlewares/flash')
const guestMiddleware = require('./app/middlewares/guest')

const FilesController = require('./app/controllers/FilesController')
const SessionController = require('./app/controllers/SessionController')
const UserController = require('./app/controllers/UserController')

const DashboardController = require('./app/controllers/DashboardController')

routes.use(flashMiddleware)

routes.get('/files/:file', FilesController.show)

routes.get('/', guestMiddleware, SessionController.create)
routes.post('/signin', SessionController.store)

routes.get('/signup', guestMiddleware, UserController.create)
routes.post('/signup', upload.single('avatar'), UserController.store)

routes.use('/app', authMiddleware)

routes.get('/app/logout', SessionController.destroy)

routes.get('/app/dashboard', DashboardController.index)

module.exports = routes
