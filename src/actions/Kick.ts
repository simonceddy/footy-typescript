import type EventEmitter from 'events'
import { type Action } from '../types/actions'
import type MatchSimulation from '../core/MatchSimulation'
import { type Player } from '../types/entities'
import { matchStates } from '../support'
import { rand } from '../helpers'
import Mark from './Mark'
import { type PlayerAI } from '../types/ai'
import BallInSpace from './BallInSpace'
import Turnover from './Turnover'

export default class Kick implements Action {
  static NAME: string = 'actions.kick'

  private readonly ai: PlayerAI

  constructor (public simulation: MatchSimulation, public player: Player) {
    const ai = this.simulation.playerAI.forPlayer(this.player)
    if (ai === undefined) throw new Error(`No Player AI for ${this.player.name.toString(true)}`)
    this.ai = ai
  }

  get eventEmitter (): EventEmitter {
    return this.simulation.eventEmitter
  }

  get name (): string {
    return Kick.NAME
  }

  private getOwnPosition (): string {
    const pos = this.ai.isAwayPlayer
      ? this.simulation.matchup.awayTeamContainer.playersPosition(this.player)
      : this.simulation.matchup.homeTeamContainer.playersPosition(this.player)
    if (pos === null) {
      throw new Error(`Could not resolve position for ${this.player.name.toString(true)}`)
    }
    return pos
  }

  process (): Action | null {
    // determine target or kick to space
    this.simulation.state = matchStates.BALL_IN_FLIGHT

    this.eventEmitter.emit(this.name, this.simulation, this.player)
    const roll = rand(0, 4)
    if (roll === 0) {
      return new Turnover(this.simulation, this.player)
    }
    if (roll < 3) {
      const target: Player = this.ai.getTarget()
      // console.log(`nice kick to ${target.name.toString(true)}`)
      return new Mark(this.simulation, target)
    }
    if (roll === 3) {
      // return contested ball
    }

    return new BallInSpace(this.simulation)
  }
}
