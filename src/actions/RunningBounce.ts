import type EventEmitter from 'events'
import { type Action } from '../types/actions'
import type MatchSimulation from '../core/MatchSimulation'
import { type Player } from '../types/entities'

export default class RunningBounce implements Action {
  duration: number = 400

  static NAME: string = 'actions.runningbounce'

  constructor (public simulation: MatchSimulation, public player: Player) {
  }

  get eventEmitter (): EventEmitter {
    return this.simulation.eventEmitter
  }

  get name (): string {
    return RunningBounce.NAME
  }

  getDuration (): number {
    return this.duration
  }

  process (): Action | null {
    // TODO put logic here
    return null
  }
}
