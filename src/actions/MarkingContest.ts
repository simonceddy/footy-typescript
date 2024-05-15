/* eslint-disable @typescript-eslint/no-unused-vars */
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
  duration: number = 200

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

  getDuration (): number {
    return this.duration
  }

  process (): Action | null {
    const opponent = this.ai.getOpponentOf(this.player)
    if (opponent === null) {
      throw new Error(`Could not locate opponent for ${this.player.name.toString(true)}`)
    }
    const playerStrength = this.player.attributes?.attributes.strength ?? 5
    const opponentStrength = opponent.attributes?.attributes.strength ?? 5
    const playerMarking = this.player.attributes?.attributes.marking ?? 5
    const opponentMarking = opponent.attributes?.attributes.marking ?? 5
    // determine outcome of marking contest
    // TODO take into account player attributes
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
