import EventEmitter from 'events'
import { Clock } from '../core'
import MatchContainer from '../core/MatchContainer'
import { type Match } from '../types/core'
import teamFactory from './teamFactory'
import PlayingList from '../collections/PlayingList'
import playerFactory from './playerFactory'
import TeamContainer from '../core/TeamContainer'
import playingFieldFactory from './playingFieldFactory'
import { type MatchupFactoryOptions, type MatchupFactoryAttributes } from '../types/factories'
import { generateNumbers } from '../helpers'

export default function matchupFactory (
  attributes?: MatchupFactoryAttributes,
  options?: MatchupFactoryOptions
): Match {
  const homeTeam = teamFactory(attributes, options)
  const awayTeam = teamFactory(attributes, options)
  const homeList = new PlayingList([], homeTeam)
  const awayList = new PlayingList([], awayTeam)
  const homeNums: number[] = generateNumbers()
  const awayNums: number[] = generateNumbers()
  for (let i = 0; i < 23; i += 1) {
    homeList.add(playerFactory({ ...attributes, team: homeTeam, number: homeNums[i] }, {
      ...options,
      takenNicknames: [...homeList.players]
        .filter((player) => player.name.nickname !== null)
        .map((player) => {
          if (player.name.nickname === null) return ''
          if (typeof player.name.nickname === 'string') return player.name.nickname
          return player.name.nickname[0]
        })
    }))
    awayList.add(playerFactory({ ...attributes, team: awayTeam, number: awayNums[i] }, {
      ...options,
      takenNicknames: [...awayList.players]
        .filter((player) => player.name.nickname !== null)
        .map((player) => {
          if (player.name.nickname === null) return ''
          if (typeof player.name.nickname === 'string') return player.name.nickname
          return player.name.nickname[0]
        })
    }))
  }
  const eventEmitter = new EventEmitter()

  const playingField = playingFieldFactory(attributes)

  return new MatchContainer(
    new Clock(eventEmitter),
    new TeamContainer(homeTeam, homeList),
    new TeamContainer(awayTeam, awayList),
    playingField
  )
}
