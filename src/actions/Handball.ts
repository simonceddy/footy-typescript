import type EventEmitter from 'events'
import { type Action } from '../types/actions'
import type MatchSimulation from '../core/MatchSimulation'
import { type Player } from '../types/entities'
import { type PlayerAI } from '../types/ai'
// import { matchStates } from '../support'
import GainPossession from './GainPossession'
import { rand } from '../helpers'
import Turnover from './Turnover'

export default class Handball implements Action {
  duration: number = 400

  static NAME: string = 'actions.handball'

  ai: PlayerAI

  constructor (public simulation: MatchSimulation, public player: Player) {
    const ai = this.simulation.playerAI.forPlayer(this.player)
    if (ai === undefined) throw new Error(`No Player AI for ${this.player.name.toString(true)}`)
    this.ai = ai
  }

  get eventEmitter (): EventEmitter {
    return this.simulation.eventEmitter
  }

  get name (): string {
    return Handball.NAME
  }

  getDuration (): number {
    return this.duration
  }

  process (): Action | null {
    // TODO put logic here
    // determine target
    // determine success - improve by taking into account congestion
    this.eventEmitter.emit(this.name, this.simulation, this.player)
    const roll = rand(1, 7)
    if (roll === 2) {
      // stolen!
      return new Turnover(this.simulation, this.player)
    }
    const target = this.ai.getTarget(true)
    // console.log(`${this.player.name.toString(true)} handballs to ${target.name.toString(true)}`)
    return new GainPossession(this.simulation, target)
  }
}
