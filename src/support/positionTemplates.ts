import * as positions from './positions'

export const positionTemplates = {
  RUCK: [
    positions.RUCK
  ],
  INSIDE_MID: [
    positions.CENTER,
    positions.ROVER,
    positions.RUCK_ROVER
  ],
  OUTSIDE_MID: [
    positions.CENTER,
    positions.LEFT_WINGER,
    positions.RIGHT_WINGER,
    positions.RUCK_ROVER,
    positions.ROVER
  ],
  TAGGER: [
    positions.CENTER,
    positions.LEFT_WINGER,
    positions.RIGHT_WINGER,
    positions.RUCK_ROVER,
    positions.ROVER
  ],
  KEY_BACK: [
    positions.FULL_BACK,
    positions.CENTER_HALF_BACK,
    positions.RIGHT_BACK_POCKET,
    positions.LEFT_BACK_POCKET
  ],
  RUNNING_BACK: [
    positions.CENTER_HALF_BACK,
    positions.LEFT_HALF_BACK,
    positions.RIGHT_HALF_BACK
  ],
  SMALL_FORWARD: [
    positions.LEFT_HALF_FORWARD,
    positions.RIGHT_HALF_FORWARD,
    positions.LEFT_FORWARD_POCKET,
    positions.RIGHT_FORWARD_POCKET
  ],
  KEY_FORWARD: [
    positions.FULL_FORWARD,
    positions.CENTER_HALF_FORWARD,
    positions.RIGHT_FORWARD_POCKET,
    positions.LEFT_FORWARD_POCKET
  ],
  UTILITY: [
    ...Object.keys(positions).filter((p) => p !== positions.DEBUG)
  ]
}

export const templateKeys = Object.fromEntries(Object.keys(positionTemplates)
  .map((key) => [key, key]))
