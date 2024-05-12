import type CoordinatesDirectory from '../core/CoordinatesDirectory'
import determineStartingCoordinates from '../geometry/determineStartingCoordinates'
import { positionKeys } from '../support'
import { type Match } from '../types/core'
import { type Vector as VectorType } from '../types/geometry'
import { type PositionMap } from '../types/support'

export function isVector (coords: VectorType | undefined): coords is VectorType {
  return coords?.x !== undefined && coords.y !== undefined
}

export function setStartingPositions (match: Match, directory: CoordinatesDirectory): CoordinatesDirectory {
  const homeCoords: PositionMap = determineStartingCoordinates(match.playingField)
  const awayCoords: PositionMap = determineStartingCoordinates(match.playingField, true)

  positionKeys.forEach((pos, id) => {
    if (isVector(homeCoords[pos]) && match.homeTeamContainer.positionMap[pos] !== undefined) {
      directory.forPlayer(match.homeTeamContainer.positionMap[pos], awayCoords[pos])
    }
    if (isVector(awayCoords[pos]) && match.awayTeamContainer.positionMap[pos] !== undefined) {
      directory.forPlayer(match.awayTeamContainer.positionMap[pos], awayCoords[pos])
    }
  })

  return directory
}
