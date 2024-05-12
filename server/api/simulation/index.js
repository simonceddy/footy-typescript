const express = require('express')
const matchSchema = require('./matchup-schema.json')
const prepareMatchSimulation = require('../../../build/core/bootstrap/prepareMatchSimulation').default;
const {
  matchupFactory,
  // playerFactory,
  // leagueFactory,
  // fixtureFactory
} = require('../../../build/factories');
const { Kernel } = require('../../../build/core');

const simulationRouter = express.Router()

simulationRouter.get('/match/schema', (_req, res) => {
  res.json(matchSchema)
})

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
  const { homeTeamContainer, awayTeamContainer, playingField } = req.body
  console.log(homeTeamContainer, awayTeamContainer, playingField)

  const homeTeamLocation = homeTeamContainer?.team?.location

  /** @type {import('../../../src/types/factories').MatchupFactoryAttributes} */
  const factoryAttributes = {
    homeTeamAttributes: {
      location: homeTeamLocation,
      teamName: homeTeamContainer?.team?.name,
      shorthand: homeTeamContainer?.team?.shorthand,
      homeground: homeTeamContainer?.team?.homeground,
      colour1: homeTeamContainer?.team?.colours?.colour1,
      colour2: homeTeamContainer?.team?.colours?.colour2, 
      colour3: homeTeamContainer?.team?.colours?.colour3, 
    },
    awayTeamAttributes: {
      location: awayTeamContainer?.team?.location,
      teamName: awayTeamContainer?.team?.name,
      shorthand: awayTeamContainer?.team?.shorthand,
      homeground: awayTeamContainer?.team?.homeground,
      colour1: awayTeamContainer?.team?.colours?.colour1,
      colour2: awayTeamContainer?.team?.colours?.colour2, 
      colour3: awayTeamContainer?.team?.colours?.colour3, 
    },
    homePlayingList: homeTeamContainer?.playingList?.players,
    awayPlayingList: awayTeamContainer?.playingList?.players,
    playingFieldAttributes: {
      width: playingField?.yAxis,
      length: playingField?.xAxis,
      location: homeTeamLocation,
      name: playingField?.name
    }
  }

  /** @type {import('../../../src/types/core').Match} */
  const match = matchupFactory(factoryAttributes)
  // const compMatch = matchupFactory()
  const kernel = Kernel.init()
  const sim = prepareMatchSimulation(match, kernel)

  const result = await Promise.resolve(() => {
    const result = kernel.run(sim)
    return result
  })
  return res.json(result())
  // return res.json(match)
})

module.exports = simulationRouter;
