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
import BallInSpace from './BallInSpace'

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
    const playerRoll = random(playerMarking + playerStrength, 20, false)
    const opponentRoll = random(opponentMarking + opponentStrength, 20, false)
    if (opponentRoll > 18 && playerRoll < 18) {
      return new InterceptMark(this.simulation, opponent)
    }
    if (opponentRoll > playerRoll) {
      return new Spoil(this.simulation, opponent)
    }
    if (playerRoll > 15 && opponentRoll < 15) {
      return new Mark(this.simulation, this.player)
    }
    return new BallInSpace(this.simulation)
  }
}
