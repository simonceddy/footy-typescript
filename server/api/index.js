const express = require('express');
const factoryRouter = require('./factory');
const simulationRouter = require('./simulation');

const apiRouter = express.Router()

apiRouter.use('/factory', factoryRouter)
apiRouter.use('/simulation', simulationRouter)

module.exports = apiRouter;
