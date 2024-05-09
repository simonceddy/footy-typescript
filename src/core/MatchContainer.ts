import { type Clock, type Match } from '../types/core'
import { type Team, type PlayingList } from '../types/entities'
import { type PlayingField } from '../types/geometry'
import type TeamContainer from './TeamContainer'

export default class MatchContainer implements Match {
  constructor (
    public clock: Clock,
    public homeTeamContainer: TeamContainer,
    public awayTeamContainer: TeamContainer,
    public playingField: PlayingField
  ) {}

  get homeTeam (): Team {
    return this.homeTeamContainer.team
  }

  get awayTeam (): Team {
    return this.awayTeamContainer.team
  }

  get homeTeamPlayers (): PlayingList {
    return this.homeTeamContainer.playingList
  }

  get awayTeamPlayers (): PlayingList {
    return this.awayTeamContainer.playingList
  }
}
