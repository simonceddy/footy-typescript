/* eslint-disable @typescript-eslint/no-unused-vars */
import type EventEmitter from 'events'
import { type Action } from '../types/actions'
import type MatchSimulation from '../core/MatchSimulation'
import { type Player } from '../types/entities'
import { matchStates, positions } from '../support'
import { rand } from '../helpers'
import Hitout from './Hitout'
import FreeKick from './FreeKick'

export default class RuckContest implements Action {
  duration: number = 600

  static NAME: string = 'action.ruckContest'

  homeRuck: Player

  awayRuck: Player

  constructor (
    public simulation: MatchSimulation
  ) {
    this.awayRuck = this.simulation.matchup.awayTeamContainer.positionMap[positions.RUCK]
    this.homeRuck = this.simulation.matchup.homeTeamContainer.positionMap[positions.RUCK]
  }

  getDuration (): number {
    return this.duration
  }

  process (): Action | null {
    // TODO use player attributes to determine outcomes
    if (rand(0, 10, false) === 10) {
      // determine if ruck infringement
      const freeWinner = rand(0, 1) === 0 ? this.homeRuck : this.awayRuck
      return new FreeKick(this.simulation, freeWinner)
    }
    const winner = rand(0, 1, false) === 1 ? this.awayRuck : this.homeRuck
    // console.log(`hitout won by ${winner.name.toString(true)}`)
    return new Hitout(this.simulation, winner)
  }

  get eventEmitter (): EventEmitter {
    return this.simulation.eventEmitter
  }

  get name (): string {
    return RuckContest.NAME
  }
}
