import type EventEmitter from 'events'
import { type Action } from '../types/actions'
import type MatchSimulation from '../core/MatchSimulation'
import { type Player } from '../types/entities'
import { rand } from '../helpers'
import Kick from './Kick'
import Handball from './Handball'
import { type PlayerAI } from '../types/ai'
import { matchStates } from '../support'
import SetShot from './SetShot'
import RunningShot from './RunningShot'

export default class Disposal implements Action {
  duration: number = 400

  static NAME: string = 'actions.disposal'

  player: Player

  ai: PlayerAI

  constructor (public simulation: MatchSimulation) {
    if (this.simulation.footy.inPossession === undefined) {
      throw new Error('A disposal action was queued with no player in possession!')
    }
    this.player = this.simulation.footy.inPossession
    const ai = this.simulation.playerAI.forPlayer(this.player)
    if (ai === undefined) throw new Error(`No Player AI for ${this.player.name.toString(true)}`)
    this.ai = ai
  }

  get eventEmitter (): EventEmitter {
    return this.simulation.eventEmitter
  }

  get name (): string {
    return Disposal.NAME
  }

  getDuration (): number {
    return this.duration
  }

  process (): Action | null {
    // determine if scoring opportunity
    if (this.ai.canScore()) {
      // determine if set shot
      if (this.simulation.state === matchStates.BALL_IN_PROTECTED_POSSESSION ||
        this.simulation.state === matchStates.FREE_KICK
      ) {
        return new SetShot(this.simulation, this.player)
      }
      // TODO determine if pass or take shot
      return new RunningShot(this.simulation, this.player)
    }
    // determine type of disposal
    const typeRoll = rand(1, 2)
    if (typeRoll === 1) {
      return new Kick(this.simulation, this.player)
    }
    return new Handball(this.simulation, this.player)
  }
}
