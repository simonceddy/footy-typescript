import { type Player } from '../types/entities'
import { type Vector } from '../types/geometry'

export default class CoordinatesDirectory {
  private playerCoordinates: Record<string, Vector> = {}

  constructor (private footyCoordinates: Vector) {}

  setPlayer (player: Player, coordinates: Vector): void {
    this.playerCoordinates[player.id] = coordinates
  }

  getPlayer (player: Player): Vector | undefined {
    return this.playerCoordinates[player.id]
  }

  removePlayer (player: Player): void {
    const id = player.id
    if (this.playerCoordinates[id] !== undefined) {
      const { [id]: _, ...withoutId } = this.playerCoordinates
      this.playerCoordinates = withoutId
    }
  }

  forPlayer (player: Player, coordinates?: Vector): Vector | undefined {
    if (coordinates !== undefined) {
      this.setPlayer(player, coordinates)
    }
    return this.getPlayer(player)
  }

  set footy (coordinates: Vector) {
    this.footyCoordinates = coordinates
  }

  get footy (): Vector {
    return this.footyCoordinates
  }

  get players (): Record<string, Vector> {
    return this.playerCoordinates
  }
}
