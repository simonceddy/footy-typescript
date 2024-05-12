import type EventEmitter from 'events'
import { type Action } from '../types/actions'
import type MatchSimulation from '../core/MatchSimulation'
import { type Player } from '../types/entities'

export default class Shepherd implements Action {
  duration: number = 0

  static NAME: string = 'actions.shepherd'

  constructor (public simulation: MatchSimulation, public player: Player, public target: Player) {
  }

  get eventEmitter (): EventEmitter {
    return this.simulation.eventEmitter
  }

  get name (): string {
    return Shepherd.NAME
  }

  getDuration (): number {
    return this.duration
  }

  process (): Action | null {
    // TODO put logic here
    return null
  }
}
