import type CoordinatesDirectory from '../core/CoordinatesDirectory'
import determineStartingCoordinates from '../geometry/determineStartingCoordinates'
import { positionKeys } from '../support'
import { type Match } from '../types/core'
import { type Vector, type PlayingField, type Vector as VectorType } from '../types/geometry'
import { type PositionMap } from '../types/support'

export function isVector (coords: VectorType | undefined): coords is VectorType {
  return coords?.x !== undefined && coords.y !== undefined
}

export function setStartingPositions (match: Match, directory: CoordinatesDirectory): CoordinatesDirectory {
  const homeCoords: PositionMap = determineStartingCoordinates(match.playingField)
  const awayCoords: PositionMap = determineStartingCoordinates(match.playingField, true)

  positionKeys.forEach((pos) => {
    if (isVector(homeCoords[pos]) && match.homeTeamContainer.positionMap[pos] !== undefined) {
      directory.forPlayer(match.homeTeamContainer.positionMap[pos], awayCoords[pos])
    }
    if (isVector(awayCoords[pos]) && match.awayTeamContainer.positionMap[pos] !== undefined) {
      directory.forPlayer(match.awayTeamContainer.positionMap[pos], awayCoords[pos])
    }
  })

  return directory
}

export function inFieldOfPlay (playingField: PlayingField, vector: Vector): boolean {
  const { x, y } = vector
  // console.log(vector)
  if (x > playingField.xAxis || y > playingField.yAxis) return false
  const { x: r1, y: r2 } = playingField.radius
  const result = ((((x - playingField.center.x) * (x - playingField.center.x)) / (r1 * r1)) +
   (((y - playingField.center.y) * (y - playingField.center.y)) / (r2 * r2)))
  // console.log(result)
  return result <= 1
}
