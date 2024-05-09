const express = require('express')
const {
  matchupFactory,
  playerFactory,
  leagueFactory,
  fixtureFactory
} = require('../../../build/factories');

const factoryRouter = express.Router()

factoryRouter.get('/match', (_req, res) => res.json(matchupFactory()))
factoryRouter.get('/player', (_req, res) => res.json(playerFactory()))
factoryRouter.get('/league', (_req, res) => {
  const league = leagueFactory()
  const fixture = fixtureFactory(Object.values(league.teams), 22)
  res.json({ league, fixture })
})

module.exports = factoryRouter;
