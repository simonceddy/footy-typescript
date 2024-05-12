import type EventEmitter from 'events'
import { type MatchSettings, type Match, type Clock } from '../types/core'
import type CoordinatesDirectory from './CoordinatesDirectory'
import { matchStates } from '../support'
import { type Player, type Footy } from '../types/entities'
import { Sherrin } from '../entities'
import PlayerAIDirectory from '../ai/PlayerAIDirectory'
import { type StatKeeper as StatKeeperType } from '../types/stats'
import StatKeeper from '../stats/StatKeeper'
import Scoreboard from '../stats/Scoreboard'

const defaultMatchSettings: MatchSettings = {
  quarters: 4,
  msPerQuarter: 1200000
}

export default class MatchSimulation {
  settings: MatchSettings

  currentQuarter: number = 1

  footy: Footy

  playerAI: PlayerAIDirectory

  stats: StatKeeperType

  scores: Scoreboard

  constructor (
    public eventEmitter: EventEmitter,
    public matchup: Match,
    public coordinates: CoordinatesDirectory,
    settings: MatchSettings = {},
    public state: string = matchStates.RUCK_CONTEST,
    playerAI?: PlayerAIDirectory
  ) {
    this.settings = { ...defaultMatchSettings, ...settings }
    // TODO
    this.footy = new Sherrin()
    this.playerAI = playerAI ?? PlayerAIDirectory.init(this)
    this.stats = StatKeeper.init(this)
    this.scores = new Scoreboard(this.matchup.homeTeam, this.matchup.awayTeam)
  }

  allPlayers (): Player[] {
    return [
      ...this.matchup.homeTeamPlayers.players,
      ...this.matchup.awayTeamPlayers.players
    ]
  }

  getPlayer (playerId: string): Player | null {
    const players = this.allPlayers()
    const player = players.find((p) => p.id === playerId)
    return player ?? null
  }

  get clock (): Clock {
    return this.matchup.clock
  }
}
