const { app } = require('./app.js');
const { info } = require('./utils/logger.js');
const { PORT } = require('./utils/configs.js');

app.listen(() => {
    info(`Server running on port ${PORT}`)
})