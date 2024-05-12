import type EventEmitter from 'events'
import { type Action } from '../types/actions'
import type MatchSimulation from '../core/MatchSimulation'
import { type Player } from '../types/entities'
import BallInSpace from './BallInSpace'

export default class Spoil implements Action {
  duration: number = 400

  static NAME: string = 'actions.spoil'

  constructor (public simulation: MatchSimulation, public player: Player) {
  }

  get eventEmitter (): EventEmitter {
    return this.simulation.eventEmitter
  }

  get name (): string {
    return Spoil.NAME
  }

  getDuration (): number {
    return this.duration
  }

  process (): Action | null {
    // TODO put logic here
    this.eventEmitter.emit(this.name, this.simulation, this.player)

    return new BallInSpace(this.simulation)
  }
}
