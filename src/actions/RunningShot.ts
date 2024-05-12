import type EventEmitter from 'events'
import { type Action } from '../types/actions'
import type MatchSimulation from '../core/MatchSimulation'
import { type Player } from '../types/entities'
import Turnover from './Turnover'
import Score from './Score'
import { rand } from '../helpers'

export default class RunningShot implements Action {
  static NAME: string = 'actions.runningshot'

  constructor (public simulation: MatchSimulation, public player: Player) {
  }

  get eventEmitter (): EventEmitter {
    return this.simulation.eventEmitter
  }

  get name (): string {
    return RunningShot.NAME
  }

  process (): Action | null {
    // TODO put logic here
    // determine difficulty of shot - congestion, position, player attributes
    const scoreRoll = rand(0, 4)
    if (scoreRoll === 0) {
      // out on the full - return free kick to opponent
      return new Turnover(this.simulation, this.player)
    }
    // return score action
    return new Score(this.simulation, this.player)
  }
}
