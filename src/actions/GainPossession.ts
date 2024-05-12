import type EventEmitter from 'events'
import { type Action } from '../types/actions'
import type MatchSimulation from '../core/MatchSimulation'
import { type Player } from '../types/entities'
import { matchStates } from '../support'
import Disposal from './Disposal'

export default class GainPossession implements Action {
  duration: number = 0

  static NAME: string = 'actions.gainpossession'

  constructor (public simulation: MatchSimulation, public player: Player, private readonly isProtected = false) {
  }

  get eventEmitter (): EventEmitter {
    return this.simulation.eventEmitter
  }

  get name (): string {
    return GainPossession.NAME
  }

  getDuration (): number {
    return this.duration
  }

  process (): Action | null {
    // TODO put logic here
    this.simulation.footy.inPossession = this.player
    if (this.simulation.state === matchStates.FREE_KICK) {
      // determine free kick outcome
      // can a set shot be taken
    } else if (!this.isProtected) {
      // console.log(`${this.player.name.toString(true)} gains possession`)
    }
    this.simulation.state = this.isProtected
      ? matchStates.BALL_IN_PROTECTED_POSSESSION
      : matchStates.BALL_IN_POSSESSION
    return new Disposal(this.simulation)
  }
}
