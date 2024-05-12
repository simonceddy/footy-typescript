import type EventEmitter from 'events'
import { type Action } from '../types/actions'
import type MatchSimulation from '../core/MatchSimulation'
import { type Player } from '../types/entities'
import GainPossession from './GainPossession'

export default class InterceptMark implements Action {
  duration: number = 400

  static NAME: string = 'actions.interceptmark'

  constructor (public simulation: MatchSimulation, public player: Player) {
  }

  get eventEmitter (): EventEmitter {
    return this.simulation.eventEmitter
  }

  get name (): string {
    return InterceptMark.NAME
  }

  getDuration (): number {
    return this.duration
  }

  process (): Action | null {
    // TODO put logic here
    this.eventEmitter.emit(this.name, this.simulation, this.player)
    return new GainPossession(this.simulation, this.player, true)
  }
}
