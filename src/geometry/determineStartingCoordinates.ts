import { positions } from '../support'
import { type PlayingField } from '../types/geometry'
import { type PositionMap } from '../types/support'
import Vector from './Vector'

export default function determineStartingCoordinates (
  playingField: PlayingField,
  flip: boolean = false
): PositionMap {
  const length = playingField.xAxis
  const width = playingField.yAxis
  const wA = Math.round(width / 4)
  const xPadding = Math.round(length / 11)
  const wingPadding = Math.round(width / 6)

  const map: PositionMap = {
    [positions.FULL_FORWARD]: flip
      ? new Vector(length - xPadding, playingField.center.y)
      : new Vector(xPadding, playingField.center.y),
    [positions.RIGHT_FORWARD_POCKET]: flip
      ? new Vector(width - xPadding - 2, playingField.center.y + 20)
      : new Vector(xPadding + 2, playingField.center.y - 20),
    [positions.LEFT_FORWARD_POCKET]: flip
      ? new Vector(width - xPadding - 2, playingField.center.y - 20)
      : new Vector(xPadding + 2, playingField.center.y + 20),
    [positions.RIGHT_HALF_FORWARD]: flip
      ? new Vector(length - xPadding - 35, width - wA)
      : new Vector(xPadding + 35, wA),
    [positions.CENTER_HALF_FORWARD]: flip
      ? new Vector(length - xPadding - 40, playingField.center.y)
      : new Vector(xPadding + 40, playingField.center.y),
    [positions.LEFT_HALF_FORWARD]: flip
      ? new Vector(length - xPadding - 35, wA)
      : new Vector(xPadding + 35, width - wA),
    [positions.RIGHT_WINGER]: flip
      ? new Vector(playingField.center.x, width - wingPadding)
      : new Vector(playingField.center.x, wingPadding),
    [positions.LEFT_WINGER]: flip
      ? new Vector(playingField.center.x, wingPadding)
      : new Vector(playingField.center.x, width - wingPadding),
    [positions.FULL_BACK]: flip
      ? new Vector(xPadding, playingField.center.y)
      : new Vector(length - xPadding, playingField.center.y),
    [positions.LEFT_BACK_POCKET]: flip
      ? new Vector(xPadding + 2, playingField.center.y + 20)
      : new Vector(length - xPadding + 2, playingField.center.y - 20),
    [positions.RIGHT_BACK_POCKET]: flip
      ? new Vector(xPadding + 2, playingField.center.y - 20)
      : new Vector(length - xPadding + 2, playingField.center.y + 20),
    [positions.LEFT_HALF_BACK]: flip
      ? new Vector(xPadding + 35, width - wA)
      : new Vector(length - xPadding + 35, wA),
    [positions.CENTER_HALF_BACK]: flip
      ? new Vector(xPadding + 40, playingField.center.y)
      : new Vector(length - xPadding + 40, playingField.center.y),
    [positions.RIGHT_HALF_BACK]: flip
      ? new Vector(xPadding + 35, wA)
      : new Vector(length - xPadding + 35, width - wA),
    [positions.CENTER]: new Vector(
      playingField.center.x - (flip ? -7 : 7),
      playingField.center.y
    ),
    [positions.ROVER]: new Vector(
      playingField.center.x - (flip ? -4 : 4),
      playingField.center.y - (flip ? -4 : 4)
    ),
    [positions.RUCK_ROVER]: new Vector(
      playingField.center.x + (flip ? -4 : 4),
      playingField.center.y + (flip ? -4 : 4)
    ),
    [positions.RUCK]: new Vector(
      playingField.center.x + (flip ? -3 : 3),
      playingField.center.y
    )
  }

  return map
}
