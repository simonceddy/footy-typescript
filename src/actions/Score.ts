import type EventEmitter from 'events'
import { type Action } from '../types/actions'
import type MatchSimulation from '../core/MatchSimulation'
import { type Player } from '../types/entities'
import { rand } from '../helpers'
import BehindScored from '../events/BehindScored'
import GoalScored from '../events/GoalScored'
import { matchStates } from '../support'
import KickIn from './KickIn'
import RuckContest from './RuckContest'

export default class Score implements Action {
  static NAME: string = 'actions.score'

  constructor (public simulation: MatchSimulation, public player: Player) {
  }

  get eventEmitter (): EventEmitter {
    return this.simulation.eventEmitter
  }

  get name (): string {
    return Score.NAME
  }

  process (): Action | null {
    // TODO put logic here
    // determine if goal or behind
    // update scoreboard
    // update stats
    const roll = rand(1, 2)
    if (roll === 1) {
      // behind
      // console.log(`${this.player.name.toString(true)} kicks a point`)
      this.eventEmitter.emit(BehindScored.NAME, this.simulation, this.player)
      // return kickin

      return new KickIn(this.simulation, this.player)
    }
    // else goal
    // return reset of play
    this.eventEmitter.emit(GoalScored.NAME, this.simulation, this.player)
    // console.log(`${this.player.name.toString(true)} kicks a goal`)
    // TODO reset positions
    this.simulation.state = matchStates.RUCK_CONTEST

    return new RuckContest(this.simulation)
  }
}
