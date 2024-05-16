import { random } from 'lodash'
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
import MarkingContest from './MarkingContest'

export default class Kick implements Action {
  duration: number

  static NAME: string = 'actions.kick'

  private readonly ai: PlayerAI

  constructor (public simulation: MatchSimulation, public player: Player) {
    const ai = this.simulation.playerAI.forPlayer(this.player)
    if (ai === undefined) throw new Error(`No Player AI for ${this.player.name.toString(true)}`)
    this.ai = ai
    this.duration = random(6, 20) * 100
  }

  get eventEmitter (): EventEmitter {
    return this.simulation.eventEmitter
  }

  get name (): string {
    return Kick.NAME
  }

  getDuration (): number {
    return this.duration
  }

  process (): Action | null {
    // determine target or kick to space
    this.simulation.state = matchStates.BALL_IN_FLIGHT
    const playerKicking = this.player.attributes?.attributes.kicking ?? 5
    this.eventEmitter.emit(this.name, this.simulation, this.player)
    const roll = rand(playerKicking, 20)
    if (roll < 10) {
      return new Turnover(this.simulation, this.player)
    }
    if (roll < 15) {
      return new BallInSpace(this.simulation)
    }
    const target: Player = this.ai.getTarget()
    if (roll < 18) {
      // console.log(`nice kick to ${target.name.toString(true)}`)
      return new MarkingContest(this.simulation, target)
    }
    return new Mark(this.simulation, target)
  }
}
