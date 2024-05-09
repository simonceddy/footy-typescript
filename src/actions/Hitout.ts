import type EventEmitter from 'events'
import { type Action } from '../types/actions'
import type MatchSimulation from '../core/MatchSimulation'
import { type Player } from '../types/entities'
import { rand } from '../helpers'
import GainPossession from './GainPossession'
import { matchStates } from '../support'
import { type PlayerAI } from '../types/ai'

export default class Hitout implements Action {
  static NAME: string = 'actions.hitout'

  private readonly ai: PlayerAI

  constructor (
    public simulation: MatchSimulation,
    public player: Player
  ) {
    const ai = this.simulation.playerAI.forPlayer(this.player)
    if (ai === undefined) throw new Error(`No Player AI for ${this.player.name.toString(true)}`)
    this.ai = ai
  }

  get eventEmitter (): EventEmitter {
    return this.simulation.eventEmitter
  }

  get name (): string {
    return Hitout.NAME
  }

  private getRandomPlayer (): Player {
    const allOnfieldPlayers = [
      ...Object.values(this.simulation.matchup.homeTeamContainer.positionMap),
      ...Object.values(this.simulation.matchup.awayTeamContainer.positionMap)
    ]

    return allOnfieldPlayers[Math.floor(Math.random() * allOnfieldPlayers.length)]
  }

  process (): Action | null {
    // TODO put logic here
    // determine hitout result: to advantage, sharked, roved, to space, to contest
    this.eventEmitter.emit(this.name, this.simulation, this.player)
    const roll = rand(0, 4, false)
    if (roll === 1) {
      // roved
      const target = this.ai.getTarget(true)
      // console.log(`roved by ${target.name.toString(true)}`)
      return new GainPossession(this.simulation, target)
    }
    if (roll === 2) {
      // sharked
      const target = this.ai.getOpponent()
      // console.log(`sharked by ${target.name.toString(true)}`)
      return new GainPossession(this.simulation, target)
    }
    // to contest
    this.simulation.footy.inPossession = undefined
    // console.log('the hitout goes into congestion')
    this.simulation.state = matchStates.BALL_CONTESTED

    return new GainPossession(this.simulation, this.getRandomPlayer())
  }
}
