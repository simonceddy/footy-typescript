const express = require('express')
const prepareMatchSimulation = require('../../../build/core/bootstrap/prepareMatchSimulation').default;
const {
  matchupFactory,
  playerFactory,
  leagueFactory,
  fixtureFactory
} = require('../../../build/factories');
const { Kernel } = require('../../../build/core');

const simulationRouter = express.Router()

simulationRouter.get('/match', async (_req, res) => {
  const kernel = Kernel.init()
  const matchup = matchupFactory()
  const sim = prepareMatchSimulation(matchup, kernel)
  const result = await Promise.resolve(() => {
    const result = kernel.run(sim)
    return result
  })
  return res.json(result())
})

simulationRouter.post('/match', async (req, res) => {
  // TODO attempt to create simulation from request
  // fill required data from factories
})

module.exports = simulationRouter;
