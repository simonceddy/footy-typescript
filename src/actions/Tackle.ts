import { random } from 'lodash'
import type EventEmitter from 'events'
import { type Action } from '../types/actions'
import type MatchSimulation from '../core/MatchSimulation'
import { type Player } from '../types/entities'
import FreeKick from './FreeKick'
import BallInSpace from './BallInSpace'
import RuckContest from './RuckContest'

export default class Tackle implements Action {
  duration: number

  static NAME: string = 'actions.tackle'

  constructor (public simulation: MatchSimulation, public player: Player, public target: Player) {
    this.duration = random(5, 30) * 100
  }

  get eventEmitter (): EventEmitter {
    return this.simulation.eventEmitter
  }

  get name (): string {
    return Tackle.NAME
  }

  getDuration (): number {
    return this.duration
  }

  process (): Action | null {
    // TODO put logic here
    // determine outcome of tackle
    const playerDefense = this.player.attributes?.attributes.defense ?? 5
    const roll = random(playerDefense, 20)
    if (roll > 18) {
      return new FreeKick(this.simulation, this.target)
    }
    this.eventEmitter.emit(this.name, this.simulation, this.player, this.target)
    if (roll < 10) {
      return new FreeKick(this.simulation, this.player)
    }
    if (roll < 15) {
      return new BallInSpace(this.simulation)
    }
    this.duration = 5000
    return new RuckContest(this.simulation)
  }
}
