import { type Player } from './entities'

export interface Statline {
  playerId: string
  player: Player
  stats: Record<string, number>
}

export interface StatKeeper {
  statlines: Record<string, Statline>
  addStatForPlayer: (key: string, player: Player) => void
}
