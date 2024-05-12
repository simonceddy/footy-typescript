import * as positions from './positions'

export const bpos = [
  positions.FULL_BACK,
  positions.RIGHT_BACK_POCKET,
  positions.LEFT_BACK_POCKET
]

export const hbpos = [
  positions.CENTER_HALF_BACK,
  positions.RIGHT_HALF_BACK,
  positions.LEFT_HALF_BACK
]

export const mpos = [
  positions.CENTER,
  positions.RUCK,
  positions.RUCK_ROVER,
  positions.ROVER,
  positions.LEFT_WINGER,
  positions.RIGHT_WINGER
]

export const hfpos = [
  positions.CENTER_HALF_FORWARD,
  positions.RIGHT_HALF_FORWARD,
  positions.LEFT_HALF_FORWARD
]
export const fpos = [
  positions.FULL_FORWARD,
  positions.RIGHT_FORWARD_POCKET,
  positions.LEFT_FORWARD_POCKET
]

export const pos = {
  [positions.FULL_BACK]: hbpos,
  [positions.RIGHT_BACK_POCKET]: hbpos,
  [positions.LEFT_BACK_POCKET]: hbpos,
  [positions.CENTER_HALF_BACK]: mpos,
  [positions.RIGHT_HALF_BACK]: mpos,
  [positions.LEFT_HALF_BACK]: mpos,
  [positions.CENTER]: hfpos,
  [positions.ROVER]: hfpos,
  [positions.RUCK]: hfpos,
  [positions.RUCK_ROVER]: hfpos,
  [positions.LEFT_WINGER]: hfpos,
  [positions.RIGHT_WINGER]: hfpos,
  [positions.CENTER_HALF_FORWARD]: fpos,
  [positions.RIGHT_HALF_FORWARD]: fpos,
  [positions.LEFT_HALF_FORWARD]: fpos,
  [positions.FULL_FORWARD]: fpos,
  [positions.RIGHT_FORWARD_POCKET]: fpos,
  [positions.LEFT_FORWARD_POCKET]: fpos,
  [positions.DEBUG]: [...bpos, ...hbpos, ...mpos, ...hfpos, ...fpos]
}
