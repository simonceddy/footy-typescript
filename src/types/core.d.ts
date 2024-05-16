import { type EventEmitter } from 'events'
import { type Player, type PlayingList, type Team } from './entities'
import { type PlayingField } from './geometry'
import type MatchSimulation from '../core/MatchSimulation'
import type TeamContainer from '../core/TeamContainer'
import type Scoreboard from '../stats/Scoreboard'
import { type Statline } from './stats'

export interface Process {
  run: () => void
}

export interface ProcessQueue {
  queue: Process[]
  push: (process: Process) => void
  shift: () => Process | null
  empty: () => boolean
}

export interface QuarterTracker {
  currentQuarter: number
  timePerQuarter: number
  totalQuarters: 4 | number
}

export interface Clock {
  currentTime: number
  tick: (ms: 1 | number) => void
  reset: () => void
}

export interface Match {
  id: string
  clock: Clock
  homeTeam: Team
  awayTeam: Team
  homeTeamPlayers: PlayingList
  awayTeamPlayers: PlayingList
  playingField: PlayingField
  homeTeamContainer: TeamContainer
  awayTeamContainer: TeamContainer
}

export interface MatchProcess extends Process {}

export interface Kernel extends EventEmitter {
  name: string
  version: string
  run: (simulation: MatchSimulation) => MatchResult
}

export interface MatchSettings {
  quarters?: number
  msPerQuarter?: number
}

export interface MatchStats {
  homeTeam: Record<string, Statline>
  awayTeam: Record<string, Statline>
}

export interface MatchResult {
  victor: string | null
  score: Scoreboard
  stats: MatchStats
  id?: string
}

export interface TeamSchema {
  team: Team
  playingList: Player[]
}

export interface MatchSchema {
  /**
   * Unique Match ID
   */
  id: string
  homeTeamContainer: TeamSchema
  awayTeamContainer: TeamSchema
  playingField: PlayingField
}

export interface RoundSchema {
  matches: MatchSchema[]
}

export interface SeasonSchema {
  rounds: RoundSchema[]
}
