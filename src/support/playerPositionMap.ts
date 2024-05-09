import { type Player } from '../types/entities'
import * as positions from './positions'

export const playerPositionMap: Record<string, string[] | string> = {
  ruck: positions.RUCK,
  tallMid: [positions.RUCK_ROVER, positions.CENTER, positions.LEFT_WINGER, positions.RIGHT_WINGER],
  keyPosition: [
    positions.FULL_FORWARD,
    positions.FULL_BACK,
    positions.CENTER_HALF_BACK,
    positions.CENTER_HALF_FORWARD
  ],
  outsideMid: [
    positions.CENTER,
    positions.ROVER,
    positions.RUCK_ROVER,
    positions.RIGHT_WINGER,
    positions.LEFT_WINGER
  ],
  insideMid: [
    positions.CENTER,
    positions.ROVER,
    positions.RUCK_ROVER
  ],
  smallForward: [
    positions.RIGHT_FORWARD_POCKET,
    positions.LEFT_FORWARD_POCKET
  ],
  wing: [
    positions.LEFT_WINGER,
    positions.RIGHT_WINGER,
    positions.CENTER,
    positions.RUCK_ROVER
  ],
  tagger: [
    positions.CENTER,
    positions.RUCK_ROVER,
    positions.ROVER,
    positions.LEFT_HALF_BACK,
    positions.RIGHT_HALF_BACK,
    positions.LEFT_BACK_POCKET,
    positions.RIGHT_BACK_POCKET,
    positions.RIGHT_FORWARD_POCKET,
    positions.LEFT_FORWARD_POCKET,
    positions.RIGHT_HALF_FORWARD,
    positions.LEFT_HALF_FORWARD
  ],
  backline: [positions.LEFT_HALF_BACK, positions.RIGHT_BACK_POCKET, positions.RIGHT_HALF_BACK, positions.LEFT_BACK_POCKET],
  halfForward: [positions.RIGHT_HALF_FORWARD, positions.CENTER_HALF_FORWARD, positions.LEFT_HALF_FORWARD],
  runningBack: [positions.LEFT_HALF_BACK, positions.CENTER_HALF_BACK, positions.RIGHT_HALF_BACK]
}

export const teamMakeup = {
  back: [
    positions.LEFT_BACK_POCKET, positions.FULL_BACK, positions.RIGHT_BACK_POCKET
  ],
  halfBack: [
    positions.LEFT_HALF_BACK, positions.CENTER_HALF_BACK, positions.RIGHT_HALF_BACK
  ],
  mid: [
    positions.LEFT_WINGER, positions.CENTER, positions.RIGHT_WINGER
  ],
  halfForward: [
    positions.LEFT_HALF_FORWARD, positions.CENTER_HALF_FORWARD, positions.RIGHT_HALF_FORWARD
  ],
  forward: [
    positions.LEFT_FORWARD_POCKET, positions.FULL_FORWARD, positions.RIGHT_FORWARD_POCKET
  ],
  followers: [
    positions.RUCK, positions.ROVER, positions.RUCK_ROVER
  ]
}

export function canPlayInPosition (player: Player, position: string): boolean {
  const playerPos = player.positions
  if (playerPos !== undefined) {
    return playerPos.findIndex((pos) => playerPositionMap[pos]?.includes(position)) !== -1
  }
  return false
}
