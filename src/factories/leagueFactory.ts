import PlayingList from '../collections/PlayingList'
import { generateNumbers, randomUnusedVal } from '../helpers'
import { type Team, type League as LeagueType } from '../types/entities'
import { type LeagueFactoryAttributes, type LeagueFactoryOptions } from '../types/factories'
import playerFactory from './playerFactory'
import teamFactory from './teamFactory'
import { type PlayingList as PlayingListType } from '../types/entities.d'
import { loadCSVResource } from '../resources'
import League from '../entities/League'

const nicknames = loadCSVResource('nicknames')
const teamNames = loadCSVResource('teamNames')

export default function leagueFactory (
  attributes?: LeagueFactoryAttributes,
  options?: LeagueFactoryOptions
): LeagueType {
  const totalTeams = options?.totalTeams ?? 18
  const totalPlayersPerTeam = options?.totalPlayersPerTeam ?? 40

  const teams: Record<string, Team> = {}
  const teamLists: Record<string, PlayingListType> = {}

  for (let i = 0; i < totalTeams; i++) {
    const team = teamFactory(undefined, {
      takenLocations: Object.keys(teams),
      takenTeamNames: Object.values(teams).map((team) => team.name)
    })
    const teamList = new PlayingList([], team)

    const numbers: number[] = generateNumbers()

    for (let i = 0; i < totalPlayersPerTeam; i += 1) {
      teamList.add(playerFactory({ team, number: numbers[i] }, {
        ...options,
        takenNicknames: [...teamList.players]
          .filter((player) => player.name.nickname !== null)
          .map((player) => {
            if (player.name.nickname === null) return ''
            if (typeof player.name.nickname === 'string') return player.name.nickname
            return player.name.nickname[0]
          })
      }))
      teams[team.location] = team
      teamLists[team.location] = teamList
    }
  }
  const name = attributes?.name ?? `${randomUnusedVal([...nicknames, ...teamNames], Object.values(teams).map((team) => team.name))} Cup`

  return new League(
    name,
    teams,
    teamLists
  )
}
