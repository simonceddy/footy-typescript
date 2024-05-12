import type EventEmitter from 'events'
import { type Action } from '../types/actions'
import type MatchSimulation from '../core/MatchSimulation'
import { type Player } from '../types/entities'

export default class ContestedMark implements Action {
  static NAME: string = 'actions.contestedmark'

  constructor (public simulation: MatchSimulation, public player: Player) {
  }

  get eventEmitter (): EventEmitter {
    return this.simulation.eventEmitter
  }

  get name (): string {
    return ContestedMark.NAME
  }

  process (): Action | null {
    // TODO put logic here
    return null
  }
}
