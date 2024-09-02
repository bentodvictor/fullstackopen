const { MONGODB_URI } = require('./utils/configs.js');
const express = require('express')
const app = express();
const cors = require('cors')
const blogsRouter = require('./controllers/blogs.js')
const usersRouter = require('./controllers/users.js')
const loginRouter = require('./controllers/login.js')
const { requestLogger, unknownEndpoint, errorHandler, tokenExtractor } = require('./utils/middleware.js')
const { info, error } = require('./utils/logger.js')
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

info('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
    .then(() => {
        info('connected to MongoDB')
    })
    .catch((err) => {
        error('error connecting to MongoDB', err)
    })

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use(requestLogger)
app.use(tokenExtractor)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app