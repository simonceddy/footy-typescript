/* eslint-disable @typescript-eslint/no-unused-vars */
import type EventEmitter from 'events'
import { type Action } from '../types/actions'
import type MatchSimulation from '../core/MatchSimulation'
import { type Player } from '../types/entities'
import { matchStates, positions } from '../support'
import { rand } from '../helpers'
import Hitout from './Hitout'
import FreeKick from './FreeKick'
import { random } from 'lodash'
import BallInSpace from './BallInSpace'

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
    const homeRucking = this.homeRuck.attributes?.attributes.rucking ?? 5
    const awayRucking = this.awayRuck.attributes?.attributes.rucking ?? 5
    const homeRoll = Math.round(random(homeRucking, 20))
    const awayRoll = Math.round(random(awayRucking, 20))
    if (homeRoll === awayRoll) {
      // no clear winner
      return new BallInSpace(this.simulation)
    }
    if ((homeRoll > 19 || awayRoll > 19) && homeRoll !== awayRoll) {
      // determine if ruck infringement
      const freeWinner = homeRoll > awayRoll ? this.homeRuck : this.awayRuck
      return new FreeKick(this.simulation, freeWinner)
    }
    const winner = awayRoll > homeRoll ? this.awayRuck : this.homeRuck
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
