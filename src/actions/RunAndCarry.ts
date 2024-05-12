import type EventEmitter from 'events'
import { type Action } from '../types/actions'
import type MatchSimulation from '../core/MatchSimulation'
import { type Player } from '../types/entities'
import { type PlayerAI } from '../types/ai'
import { random } from 'lodash'

export default class RunAndCarry implements Action {
  duration: number

  static NAME: string = 'actions.runandcarry'

  ai: PlayerAI

  constructor (public simulation: MatchSimulation, private readonly player: Player) {
    const ai = this.simulation.playerAI.forPlayer(this.player)
    if (ai === undefined) throw new Error(`No Player AI for ${this.player.name.toString(true)}`)
    this.ai = ai

    this.duration = random(8, 30) * 100
  }

  get eventEmitter (): EventEmitter {
    return this.simulation.eventEmitter
  }

  get name (): string {
    return RunAndCarry.NAME
  }

  getDuration (): number {
    return this.duration
  }

  process (): Action | null {
    // TODO put logic here
    // determine where player moves to
    return null
  }
}
