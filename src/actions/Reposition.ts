import { random } from 'lodash'
import type EventEmitter from 'events'
import { type Action } from '../types/actions'
import type MatchSimulation from '../core/MatchSimulation'
import { type Player } from '../types/entities'
import { matchStates } from '../support'

export default class Reposition implements Action {
  duration: number

  static NAME: string = 'actions.reposition'

  constructor (public simulation: MatchSimulation, public player: Player) {
    this.duration = random(1, 10) * 100
  }

  get eventEmitter (): EventEmitter {
    return this.simulation.eventEmitter
  }

  get name (): string {
    return Reposition.NAME
  }

  getDuration (): number {
    return this.duration
  }

  process (): Action | null {
    // TODO put logic here
    if (this.simulation.footy.inPossession === this.player) {
      // player in possession - moving with ball
    }
    const ai = this.simulation.playerAI.forPlayer(this.player)
    if (ai === undefined) throw new Error(`No Player AI for ${this.player.name.toString(true)}`)
    if (this.simulation.state === matchStates.BALL_IN_POSSESSION) {
      if (ai.ownTeamInPossession()) {
        // move offensively - be more specific
      } else {
        // move defensively
      }
    }
    return null
  }
}
