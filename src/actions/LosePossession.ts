import type EventEmitter from 'events'
import { type Action } from '../types/actions'
import type MatchSimulation from '../core/MatchSimulation'

// TODO is this neccessary
export default class LosePossession implements Action {
  duration: number = 100

  static NAME: string = 'actions.losepossession'

  constructor (public simulation: MatchSimulation) {
  }

  get eventEmitter (): EventEmitter {
    return this.simulation.eventEmitter
  }

  get name (): string {
    return LosePossession.NAME
  }

  getDuration (): number {
    return this.duration
  }

  process (): Action | null {
    // TODO put logic here
    return null
  }
}
