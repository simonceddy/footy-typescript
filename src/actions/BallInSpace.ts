import type EventEmitter from 'events'
import { type Action } from '../types/actions'
import type MatchSimulation from '../core/MatchSimulation'
import { matchStates } from '../support'
import { rand } from '../helpers'
import { type Player } from '../types/entities'
import GainPossession from './GainPossession'

export default class BallInSpace implements Action {
  duration: number = 1000

  static NAME: string = 'actions.ballinspace'

  constructor (public simulation: MatchSimulation) {
  }

  get eventEmitter (): EventEmitter {
    return this.simulation.eventEmitter
  }

  get name (): string {
    return BallInSpace.NAME
  }

  private getRandomPlayer (): Player {
    const allOnfieldPlayers = [
      ...Object.values(this.simulation.matchup.homeTeamContainer.positionMap),
      ...Object.values(this.simulation.matchup.awayTeamContainer.positionMap)
    ]

    return allOnfieldPlayers[Math.floor(Math.random() * allOnfieldPlayers.length)]
  }

  getDuration (): number {
    return this.duration
  }

  process (): Action | null {
    // TODO put logic here
    // determine if contested
    const roll = rand(1, 2)
    this.simulation.state = roll === 2 ? matchStates.BALL_IN_SPACE : matchStates.BALL_CONTESTED

    // TODO get closest players
    return new GainPossession(this.simulation, this.getRandomPlayer())
  }
}
