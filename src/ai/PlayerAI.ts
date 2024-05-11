import { type Team, type Player } from '../types/entities'
import { type PlayerAI as PlayerAIType } from '../types/ai.d'
import type MatchSimulation from '../core/MatchSimulation'
import { type Vector as VectorType } from '../types/geometry'
import { Vector } from '../geometry'
import { getOpposingPosition, positions } from '../support'

const bpos = [
  positions.FULL_BACK,
  positions.RIGHT_BACK_POCKET,
  positions.LEFT_BACK_POCKET
]

const hbpos = [
  positions.CENTER_HALF_BACK,
  positions.RIGHT_HALF_BACK,
  positions.LEFT_HALF_BACK
]

const mpos = [
  positions.CENTER,
  positions.RUCK,
  positions.RUCK_ROVER,
  positions.ROVER,
  positions.LEFT_WINGER,
  positions.RIGHT_WINGER
]

const hfpos = [
  positions.CENTER_HALF_FORWARD,
  positions.RIGHT_HALF_FORWARD,
  positions.LEFT_HALF_FORWARD
]
const fpos = [
  positions.FULL_FORWARD,
  positions.RIGHT_FORWARD_POCKET,
  positions.LEFT_FORWARD_POCKET
]

const pos = {
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

export default class PlayerAI implements PlayerAIType {
  isAwayPlayer: boolean

  isHomePlayer: boolean

  private currentOwnPosition: string | null

  constructor (
    public player: Player,
    public simulation: MatchSimulation
  ) {
    if (player.team === undefined) {
      throw new Error(`Player ${player.name.toString()} is not assigned to a team!`)
    }
    this.isAwayPlayer = this.player.team?.id === this.simulation.matchup.awayTeam.id
    this.isHomePlayer = !this.isAwayPlayer
    this.currentOwnPosition = this.initOwnPosition()
  }

  private initOwnPosition (): string | null {
    const pos = this.isAwayPlayer
      ? this.simulation.matchup.awayTeamContainer.playersPosition(this.player)
      : this.simulation.matchup.homeTeamContainer.playersPosition(this.player)
    return pos
  }

  teamInPossession (): Team | null {
    return this.simulation.footy.inPossession?.team ?? null
  }

  ownTeamInPossession (): boolean {
    if (this.simulation.footy.inPossession === undefined) return false
    return this.simulation.footy.inPossession.team?.id === this.player.team?.id
  }

  opponentTeamInPossession (): boolean {
    if (this.simulation.footy.inPossession === undefined) return false
    return this.simulation.footy.inPossession.team?.id !== this.player.team?.id
  }

  contestedBall (): boolean {
    return this.simulation.footy.contested
  }

  timeLeftInQuarter (): number {
    return (this.simulation.settings.msPerQuarter ?? 200000) - this.simulation.clock.currentTime
  }

  getDestination (): VectorType {
    // TODO
    return new Vector(12, 12)
  }

  canScore (): boolean {
    if (this.simulation.footy.inPossession?.id !== this.player.id ||
      this.ownPosition === null
    ) {
      return false
    }
    // TODO field awareness
    return fpos.includes(this.ownPosition)
  }

  get ownPosition (): string | null {
    return this.currentOwnPosition
  }

  set ownPosition (position: string) {
    if (positions[position] === undefined) {
      throw new Error(`Invalid position ${position} assigned to ${this.player.name.toString(true)}`)
    }
    this.currentOwnPosition = position
  }

  private getCloseTargetsTo (position: string): string[] {
    // TODO make better
    if (position === positions.DEBUG) return pos[positions.DEBUG]
    if (bpos.includes(position)) return bpos
    if (hbpos.includes(position)) return hbpos
    if (mpos.includes(position)) return mpos
    if (hfpos.includes(position)) return hfpos
    if (fpos.includes(position)) return fpos

    throw new Error(`Unknown position: ${position} for ${this.player.name.toString(true)}`)
  }

  getOpponent (position?: string): Player {
    const pos1 = this.ownPosition
    // TODO
    if (pos1 === null) {
      // throw new Error(`${this.player.name.toString(true)} has no current position`)
      return this.getRandomPlayer()
    }
    const opponentPos = getOpposingPosition(pos1)
    const possibleOpponents = this.getCloseTargetsTo(opponentPos)
    const targetPos = possibleOpponents[Math.floor(Math.random() * possibleOpponents.length)]
    const target = this.isAwayPlayer
      ? this.simulation.matchup.homeTeamContainer.positionMap[targetPos]
      : this.simulation.matchup.awayTeamContainer.positionMap[targetPos]
    return target
  }

  getTarget (close: boolean = false): Player {
    const ownPos = this.ownPosition
    // TODO
    if (ownPos === null) {
      // throw new Error(`${this.player.name.toString(true)} has no current position`)
      return this.getRandomPlayer()
    }
    let targetPos: string
    if (close) {
      const closeTargets = this.getCloseTargetsTo(ownPos)
      targetPos = closeTargets[Math.floor(Math.random() * closeTargets.length)]
    } else {
      if (pos[ownPos] === undefined) {
        throw new Error(`could not locate own position: ${ownPos} for ${this.player.name.toString(true)}`)
      }
      targetPos = pos[ownPos][Math.floor(Math.random() * pos[ownPos].length)]
    }
    const target = this.isAwayPlayer
      ? this.simulation.matchup.awayTeamContainer.positionMap[targetPos]
      : this.simulation.matchup.homeTeamContainer.positionMap[targetPos]
    return target
  }

  getRandomPlayer (): Player {
    const allOnfieldPlayers = [
      ...Object.values(this.simulation.matchup.homeTeamContainer.positionMap),
      ...Object.values(this.simulation.matchup.awayTeamContainer.positionMap)
    ]

    return allOnfieldPlayers[Math.floor(Math.random() * allOnfieldPlayers.length)]
  }
}
