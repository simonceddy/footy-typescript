import { type EventEmitter } from 'events'
import { type PlayingList, type Team } from './entities'
import { type PlayingField } from './geometry'
import type MatchSimulation from '../core/MatchSimulation'
import type TeamContainer from '../core/TeamContainer'
import type Scoreboard from '../stats/Scoreboard'
import { type StatKeeper } from './stats'

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

export interface MatchResult {
  score: Scoreboard
  stats: StatKeeper
}
