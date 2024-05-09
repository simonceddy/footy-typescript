import * as positions from './positions'

export default function getOpposingPosition (position: string): string {
  // TODO make better
  switch (position) {
    case positions.FULL_BACK:
      return positions.FULL_FORWARD
    case positions.RIGHT_BACK_POCKET:
      return positions.LEFT_FORWARD_POCKET
    case positions.LEFT_BACK_POCKET:
      return positions.RIGHT_FORWARD_POCKET
    case positions.CENTER_HALF_BACK:
      return positions.CENTER_HALF_FORWARD
    case positions.RIGHT_HALF_BACK:
      return positions.LEFT_HALF_FORWARD
    case positions.LEFT_HALF_BACK:
      return positions.RIGHT_HALF_FORWARD
    case positions.RIGHT_HALF_FORWARD:
      return positions.LEFT_HALF_BACK
    case positions.LEFT_WINGER:
      return positions.RIGHT_WINGER
    case positions.RIGHT_WINGER:
      return positions.LEFT_WINGER
    case positions.LEFT_HALF_FORWARD:
      return positions.RIGHT_HALF_BACK
    case positions.CENTER_HALF_FORWARD:
      return positions.CENTER_HALF_BACK
    case positions.RIGHT_FORWARD_POCKET:
      return positions.LEFT_BACK_POCKET
    case positions.LEFT_FORWARD_POCKET:
      return positions.RIGHT_BACK_POCKET
    case positions.FULL_FORWARD:
      return positions.FULL_BACK
    case positions.CENTER:
    case positions.RUCK:
    case positions.RUCK_ROVER:
    case positions.ROVER:
    default:
      return position
  }
}
