import type EventEmitter from 'events'
import { type Action } from '../types/actions'
import type MatchSimulation from '../core/MatchSimulation'
import { type Player } from '../types/entities'

export default class RunAndCarry implements Action {
  static NAME: string = 'actions.runandcarry'

  constructor (public simulation: MatchSimulation, private readonly player: Player) {
  }

  get eventEmitter (): EventEmitter {
    return this.simulation.eventEmitter
  }

  get name (): string {
    return RunAndCarry.NAME
  }

  process (): Action | null {
    // TODO put logic here
    return null
  }
}
