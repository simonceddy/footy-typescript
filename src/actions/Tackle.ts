import { random } from 'lodash'
import type EventEmitter from 'events'
import { type Action } from '../types/actions'
import type MatchSimulation from '../core/MatchSimulation'
import { type Player } from '../types/entities'

export default class Tackle implements Action {
  duration: number

  static NAME: string = 'actions.tackle'

  constructor (public simulation: MatchSimulation, public player: Player, public target: Player) {
    this.duration = random(5, 30) * 100
  }

  get eventEmitter (): EventEmitter {
    return this.simulation.eventEmitter
  }

  get name (): string {
    return Tackle.NAME
  }

  getDuration (): number {
    return this.duration
  }

  process (): Action | null {
    // TODO put logic here
    // determine outcome of tackle
    this.eventEmitter.emit(this.name, this.simulation, this.player, this.target)
    return null
  }
}
