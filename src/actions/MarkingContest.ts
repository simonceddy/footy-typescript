import { random } from 'lodash'
import type EventEmitter from 'events'
import { type Action } from '../types/actions'
import type MatchSimulation from '../core/MatchSimulation'
import { type Player } from '../types/entities'
import { type PlayerAI } from '../types/ai'
import Mark from './Mark'
import InterceptMark from './InterceptMark'
import Spoil from './Spoil'

export default class MarkingContest implements Action {
  static NAME: string = 'actions.markingcontest'

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
    return MarkingContest.NAME
  }

  process (): Action | null {
    // TODO put logic here
    const opponent = this.ai.getOpponentOf(this.player)
    if (opponent === null) {
      throw new Error(`Could not locate opponent for ${this.player.name.toString(true)}`)
    }
    // determine outcome of marking contest
    const roll = random(1, 10, false)
    if (roll === 1) {
      return new InterceptMark(this.simulation, opponent)
    }
    if (roll < 7) {
      return new Spoil(this.simulation, opponent)
    }
    return new Mark(this.simulation, this.player)
  }
}
