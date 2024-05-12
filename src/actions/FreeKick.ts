import type EventEmitter from 'events'
import { type Action } from '../types/actions'
import type MatchSimulation from '../core/MatchSimulation'
import { type Player } from '../types/entities'
import { matchStates } from '../support'
import GainPossession from './GainPossession'
import { random } from 'lodash'

export default class FreeKick implements Action {
  duration: number

  static NAME: string = 'actions.freekick'

  constructor (public simulation: MatchSimulation, public player: Player) {
    this.duration = random(1, 10) * 1000
  }

  get eventEmitter (): EventEmitter {
    return this.simulation.eventEmitter
  }

  get name (): string {
    return FreeKick.NAME
  }

  getDuration (): number {
    return this.duration
  }

  process (): Action | null {
    // TODO put logic here
    // console.log(`free kick to ${this.player.name.toString(true)}`)
    this.eventEmitter.emit(this.name, this.simulation, this.player)
    this.simulation.state = matchStates.FREE_KICK
    return new GainPossession(this.simulation, this.player, true)
  }
}
