import { type Team, type Player } from '../types/entities'
import { type PlayingList as PlayingListType } from '../types/entities.d'

export default class PlayingList implements PlayingListType {
  players: Player[] = []

  team?: Team

  constructor (players?: Player[], team?: Team) {
    if (players !== undefined) this.players = players
    if (team !== undefined) this.team = team
  }

  add (player: Player): void {
    this.players.push(player)
  }

  remove (player: Player): void {
    this.players = this.players.filter((p) => p.id !== player.id)
  }

  forEach (callback: (player: Player, id: number) => void): void {
    this.players.forEach(callback)
  }

  contains (player: Player | string): boolean {
    const pId = typeof player === 'string' ? player : player.id
    return this.players.find((p) => p.id === pId) !== undefined
  }
}
