import { type MatchResult } from '../../types/core'
import { type Statline } from '../../types/stats'
import type MatchSimulation from '../MatchSimulation'

export default function prepareResults (simulation: MatchSimulation): MatchResult {
  const homeTeam = simulation.matchup.homeTeam
  const awayTeam = simulation.matchup.awayTeam
  const homeTeamStats: Record<string, Statline> = {}
  const awayTeamStats: Record<string, Statline> = {}
  Object.keys(simulation.stats.statlines).forEach((playerId) => {
    const player = simulation.getPlayer(playerId)
    if (player?.team?.id === homeTeam?.id) {
      homeTeamStats[playerId] = simulation.stats.statlines[playerId]
    } else if (player?.team?.id === awayTeam?.id) {
      awayTeamStats[playerId] = simulation.stats.statlines[playerId]
    } else {
      console.log(`player ${playerId} was not matched to any team`)
    }
  })
  const homeTotal = simulation.scores.homeTotal()
  const awayTotal = simulation.scores.awayTotal()
  const isDraw = homeTotal === awayTotal
  const result: MatchResult = {
    victor: isDraw ? null : (homeTotal > awayTotal ? homeTeam.id : awayTeam.id),
    score: simulation.scores,
    stats: {
      homeTeam: homeTeamStats,
      awayTeam: awayTeamStats
    }
  }

  return result
}
