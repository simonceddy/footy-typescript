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

function transformRequestBody(match) {
  const {
    homeTeamContainer,
    awayTeamContainer,
    playingField,
    matchId
  } = match
  // console.log(homeTeamContainer, awayTeamContainer, playingField)

  const homeTeamLocation = homeTeamContainer?.team?.location

  /** @type {import('../../../src/types/factories').MatchupFactoryAttributes} */
  const factoryAttributes = {
    id: matchId,
    homeTeamAttributes: {
      location: homeTeamLocation,
      teamName: homeTeamContainer?.team?.name,
      id: homeTeamContainer?.team?.id,
      shorthand: homeTeamContainer?.team?.shorthand,
      homeground: homeTeamContainer?.team?.homeground,
      colour1: homeTeamContainer?.team?.colours?.colour1,
      colour2: homeTeamContainer?.team?.colours?.colour2, 
      colour3: homeTeamContainer?.team?.colours?.colour3, 
    },
    awayTeamAttributes: {
      location: awayTeamContainer?.team?.location,
      teamName: awayTeamContainer?.team?.name,
      id: awayTeamContainer?.team?.id,
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

  return factoryAttributes;
}

async function simulateMatch(matchData) {
  /** @type {import('../../../src/types/core').Match} */
  const match = matchupFactory(matchData)
  const kernel = Kernel.init()
  const sim = prepareMatchSimulation(match, kernel)

  const result = await Promise.resolve(() => {
    const result = kernel.run(sim)
    return result
  })

  return result
}

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
  const matchData = transformRequestBody(req.body)
  const result = await simulateMatch(matchData)
  return res.json(result())
})

// TODO These routes avoid having the client make repeated requests when simulating multiple matches
simulationRouter.post('/round', async (req, res) => {
  // TODO route for simulating entire round
  const { matches } = req.body
  if (!matches) {
    res.json({
      success: false,
      message: 'No match data was found!'
    })
  }
  const results = await Promise.all(matches.map(async (match) => {
    const matchData = transformRequestBody(match)
    const result = await simulateMatch(matchData)
    return result()
  }))
  res.json(results)
})

simulationRouter.post('/season', async (req, res) => {
  // TODO route for simulating entire season
  const { rounds } = req.body;
  const results = await Promise.all(rounds.map(async ({ matches }) => {
    const r = await Promise.all(matches.map(async (match) => {
      const matchData = transformRequestBody(match)
      const result = await simulateMatch(matchData)
      return result()
    }));
    // console.log(r);
    return r;
  }));
  // console.log(results);
  res.json(results)
})

module.exports = simulationRouter;
