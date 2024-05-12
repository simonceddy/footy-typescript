import type EventEmitter from 'events'
import { type Action } from '../types/actions'
import type MatchSimulation from '../core/MatchSimulation'
import { type Player } from '../types/entities'
import Turnover from './Turnover'
import Score from './Score'
import { matchStates } from '../support'
import { random } from 'lodash'

export default class SetShot implements Action {
  duration: number

  static NAME: string = 'actions.setshot'

  constructor (public simulation: MatchSimulation, public player: Player) {
    this.duration = random(4, 15) * 1000
  }

  get eventEmitter (): EventEmitter {
    return this.simulation.eventEmitter
  }

  get name (): string {
    return SetShot.NAME
  }

  getDuration (): number {
    return this.duration
  }

  process (): Action | null {
    // TODO put logic here
    // move set shot logic here
    this.simulation.state = matchStates.SET_SHOT
    const scoreRoll = random(0, 4)
    if (scoreRoll === 0) {
      // out on the full - return free kick to opponent
      return new Turnover(this.simulation, this.player)
    }
    // return score action
    return new Score(this.simulation, this.player)
  }
}
