import type EventEmitter from 'events'
import { type Action } from '../types/actions'
import type MatchSimulation from '../core/MatchSimulation'

export default class InitPlay implements Action {
  static NAME: string = 'actions.initplay'

  constructor (public simulation: MatchSimulation) {
  }

  get eventEmitter (): EventEmitter {
    return this.simulation.eventEmitter
  }

  get name (): string {
    return InitPlay.NAME
  }

  process (): Action | null {
    // TODO put logic here
    return null
  }
}
