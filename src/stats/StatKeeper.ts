import type MatchSimulation from '../core/MatchSimulation'
import { type Player } from '../types/entities'
import { type Statline as StatlineType, type StatKeeper as StatKeeperType } from '../types/stats'
import Statline from './Statline'

export default class StatKeeper implements StatKeeperType {
  constructor (public statlines: Record<string, StatlineType>) {
  }

  statsFor (player: Player | string): StatlineType | undefined {
    if (typeof player === 'string') return this.statlines[player]
    return this.statlines[player.id]
  }

  addStatForPlayer (key: string, player: Player): void {
    const statline = this.statsFor(player)
    if (statline !== undefined) {
      if (statline.stats[key] === undefined) {
        statline.stats[key] = 0
      }
      statline.stats[key]++
    }
  }

  static init (simulation: MatchSimulation): StatKeeper {
    const allPlayers: Player[] = [
      ...simulation.matchup.homeTeamPlayers.players,
      ...simulation.matchup.awayTeamPlayers.players
    ]

    return new StatKeeper(Object.fromEntries(allPlayers.map((player) => ([
      player.id,
      new Statline(player, {}) // TODO init stats
    ]))))
  }
}
