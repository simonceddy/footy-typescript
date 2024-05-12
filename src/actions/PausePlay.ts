import type EventEmitter from 'events'
import { type Action } from '../types/actions'
import type MatchSimulation from '../core/MatchSimulation'

// TODO is this neccessary
export default class PausePlay implements Action {
  static NAME: string = 'actions.pauseplay'

  constructor (public simulation: MatchSimulation) {
  }

  get eventEmitter (): EventEmitter {
    return this.simulation.eventEmitter
  }

  get name (): string {
    return PausePlay.NAME
  }

  process (): Action | null {
    // TODO put logic here
    return null
  }
}
