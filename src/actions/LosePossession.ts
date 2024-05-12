import type EventEmitter from 'events'
import { type Action } from '../types/actions'
import type MatchSimulation from '../core/MatchSimulation'

// TODO is this neccessary
export default class LosePossession implements Action {
  static NAME: string = 'actions.losepossession'

  constructor (public simulation: MatchSimulation) {
  }

  get eventEmitter (): EventEmitter {
    return this.simulation.eventEmitter
  }

  get name (): string {
    return LosePossession.NAME
  }

  process (): Action | null {
    // TODO put logic here
    return null
  }
}
