import { Vector } from '../../geometry'
import { positionKeys } from '../../support'
import { type Match } from '../../types/core'
import { type PlayingList, type Player } from '../../types/entities'
import CoordinatesDirectory from '../CoordinatesDirectory'
import { canPlayInPosition } from '../../support/playerPositionMap'
import { setStartingPositions } from '../../helpers/matchHelpers'

function fillPositions (playingList: PlayingList, quiet: boolean = false): Record<string, Player> {
  let players = [...playingList.players].sort((a, b) => {
    const aO = a.attributes?.attributes.overall ?? 0
    const bO = b.attributes?.attributes.overall ?? 0
    if (aO === bO) {
      return 0
    }
    return aO > bO
      ? -1
      : 1
  })
  const fieldTeam: Record<string, Player> = {}
  positionKeys.forEach((pos) => {
    if (players.length > 0) {
      let player = players.find((p) => canPlayInPosition(p, pos))
      if (player === undefined) {
        if (!quiet) console.log(`could not assign position ${pos} - returning random player`)
        player = players[Math.floor(Math.random() * players.length)]
      }
      fieldTeam[pos] = player
      players = players.filter((p) => p.id !== player?.id)
    } else {
      if (!quiet) console.log('ran out of players!')
    }
  })

  return fieldTeam
}

export default function preparePlayingField (match: Match, quiet: boolean = false): CoordinatesDirectory {
  const directory = new CoordinatesDirectory(
    new Vector(match.playingField.center.x, match.playingField.center.y)
  )

  const homePos = fillPositions(match.homeTeamPlayers, quiet)
  const awayPos = fillPositions(match.awayTeamPlayers, quiet)
  match.homeTeamContainer.positionMap = homePos
  match.awayTeamContainer.positionMap = awayPos

  return setStartingPositions(match, directory)
}
