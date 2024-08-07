import type EventEmitter from 'events'
import { type Action } from '../types/actions'
import type MatchSimulation from '../core/MatchSimulation'

export default class Wait implements Action {
  static NAME: string = 'actions.wait'

  constructor (public simulation: MatchSimulation, public duration: number = 500) {
  }

  get eventEmitter (): EventEmitter {
    return this.simulation.eventEmitter
  }

  get name (): string {
    return Wait.NAME
  }

  getDuration (): number {
    return this.duration
  }

  process (): Action | null {
    // TODO put logic here
    return null
  }
}
