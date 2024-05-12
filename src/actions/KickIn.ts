import type EventEmitter from 'events'
import { type Action } from '../types/actions'
import type MatchSimulation from '../core/MatchSimulation'
import { type Player } from '../types/entities'
import { type PlayerAI } from '../types/ai'
import { positions } from '../support'
import GainPossession from './GainPossession'

export default class KickIn implements Action {
  duration: number = 0

  static NAME: string = 'actions.kickin'

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
    return KickIn.NAME
  }

  getDuration (): number {
    return this.duration
  }

  process (): Action | null {
    // TODO put logic here
    const kicker = this.ai.getOpponent(positions.FULL_BACK)
    return new GainPossession(this.simulation, kicker)
  }
}
