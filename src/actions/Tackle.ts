import type EventEmitter from 'events'
import { type Action } from '../types/actions'
import type MatchSimulation from '../core/MatchSimulation'
import { type Player } from '../types/entities'

export default class Tackle implements Action {
  static NAME: string = 'actions.tackle'

  constructor (public simulation: MatchSimulation, public player: Player, public target: Player) {
  }

  get eventEmitter (): EventEmitter {
    return this.simulation.eventEmitter
  }

  get name (): string {
    return Tackle.NAME
  }

  process (): Action | null {
    // TODO put logic here
    // determine outcome of tackle
    this.eventEmitter.emit(this.name, this.simulation, this.player, this.target)
    return null
  }
}
