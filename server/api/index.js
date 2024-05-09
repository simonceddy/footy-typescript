const express = require('express');
const factoryRouter = require('./factory');

const apiRouter = express.Router()

apiRouter.use('/factory', factoryRouter)

module.exports = apiRouter;
