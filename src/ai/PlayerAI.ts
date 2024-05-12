import { type Team, type Player } from '../types/entities'
import { type PlayerAI as PlayerAIType } from '../types/ai.d'
import type MatchSimulation from '../core/MatchSimulation'
import { type Vector as VectorType } from '../types/geometry'
import { Vector } from '../geometry'
import { getOpposingPosition, positions } from '../support'
import { bpos, fpos, hbpos, hfpos, mpos, pos } from '../support/playerAI'

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
    this.currentOwnPosition = this.getPositionOf(this.player)
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
    const pos1 = position ?? this.ownPosition
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

  getPositionOf (player: Player): string | null {
    const isAwayPlayer = player.team?.id === this.simulation.matchup.awayTeam.id
    return isAwayPlayer
      ? this.simulation.matchup.awayTeamContainer.playersPosition(player)
      : this.simulation.matchup.homeTeamContainer.playersPosition(player)
  }

  getOpponentOf (player: Player): Player | null {
    // find player position
    if (player.id === this.player.id) {
      return this.getOpponent()
    }
    const isAwayPlayer = player.team?.id === this.simulation.matchup.awayTeam.id
    const pos = this.getPositionOf(player)

    if (pos !== null) {
      const opponentPos = getOpposingPosition(pos)
      return (isAwayPlayer
        ? this.simulation.matchup.awayTeamContainer.positionMap[opponentPos]
        : this.simulation.matchup.homeTeamContainer.positionMap[opponentPos]) ?? null
    }
    return null
  }

  getRandomPlayer (): Player {
    const allOnfieldPlayers = [
      ...Object.values(this.simulation.matchup.homeTeamContainer.positionMap),
      ...Object.values(this.simulation.matchup.awayTeamContainer.positionMap)
    ]

    return allOnfieldPlayers[Math.floor(Math.random() * allOnfieldPlayers.length)]
  }

  scoresLevel (): boolean {
    return this.simulation.scores.homeTotal() === this.simulation.scores.awayTotal()
  }

  closeMargin (maxMargin: number = 11): boolean {
    const margin = (this.simulation.scores.homeTotal() - this.simulation.scores.awayTotal())
    return margin <= maxMargin && margin >= -maxMargin
  }

  wideMargin (minMargin: number = 36): boolean {
    const margin = (this.simulation.scores.homeTotal() - this.simulation.scores.awayTotal())
    return margin >= minMargin && margin <= -minMargin
  }
}
