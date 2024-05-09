import type MatchSimulation from '../core/MatchSimulation'
import { type PlayerAI as PlayerAIType } from '../types/ai'
import { type Player } from '../types/entities'
import PlayerAI from './PlayerAI'

export default class PlayerAIDirectory {
  constructor (
    private readonly playerAI: Record<string, PlayerAIType>
  ) {}

  static init (simulation: MatchSimulation): PlayerAIDirectory {
    const players: Player[] = [
      ...simulation.matchup.homeTeamPlayers.players,
      ...simulation.matchup.awayTeamPlayers.players
    ]
    const ais = {}
    players.forEach((player) => {
      ais[player.id] = new PlayerAI(player, simulation)
    })

    return new PlayerAIDirectory(ais)
  }

  forPlayer (player: Player): PlayerAIType | undefined {
    return this.playerAI[player.id]
  }
}
