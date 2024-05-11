import EventEmitter from 'events'
import { Clock } from '../core'
import MatchContainer from '../core/MatchContainer'
import { type Match } from '../types/core'
import teamFactory from './teamFactory'
import TeamContainer from '../core/TeamContainer'
import playingFieldFactory from './playingFieldFactory'
import { type MatchupFactoryOptions, type MatchupFactoryAttributes } from '../types/factories'
import playingListFactory from './playingListFactory'

export default function matchupFactory (
  attributes?: MatchupFactoryAttributes,
  options?: MatchupFactoryOptions
): Match {
  const homeTeam = teamFactory(attributes?.homeTeamAttributes ?? attributes, options)
  const awayTeam = teamFactory(attributes?.awayTeamAttributes ?? attributes, options)

  const homeList = playingListFactory({
    team: homeTeam,
    players: attributes?.homePlayingList
  })
  const awayList = playingListFactory({
    team: awayTeam,
    players: attributes?.awayPlayingList
  })

  const eventEmitter = new EventEmitter()

  const playingField = playingFieldFactory(attributes?.playingFieldAttributes)

  return new MatchContainer(
    new Clock(eventEmitter),
    new TeamContainer(homeTeam, homeList),
    new TeamContainer(awayTeam, awayList),
    playingField
  )
}
