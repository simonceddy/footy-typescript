import { v4 as uuidv4 } from 'uuid'
import { type Clock, type Match } from '../types/core'
import { type Team, type PlayingList } from '../types/entities'
import { type PlayingField } from '../types/geometry'
import type TeamContainer from './TeamContainer'

export default class MatchContainer implements Match {
  id: string

  constructor (
    public clock: Clock,
    public homeTeamContainer: TeamContainer,
    public awayTeamContainer: TeamContainer,
    public playingField: PlayingField,
    id?: string
  ) {
    this.id = id ?? uuidv4()
  }

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
