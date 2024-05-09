import type EventEmitter from 'events'
import type MatchSimulation from '../core/MatchSimulation'

export interface Action {
  eventEmitter: EventEmitter
  simulation: MatchSimulation
  name: string
  process: () => Action | null
}
