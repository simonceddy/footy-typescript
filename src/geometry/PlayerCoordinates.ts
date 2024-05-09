import { type Player } from '../types/entities'
import Vector from './Vector'

export default class PlayerCoordinates extends Vector {
  player: Player

  constructor (player: Player, x: number, y: number) {
    super(x, y)

    this.player = player
  }

  get playerId (): string {
    return this.player.id
  }
}
