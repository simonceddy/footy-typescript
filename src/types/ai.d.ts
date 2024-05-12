/* eslint-disable @typescript-eslint/ban-types */
import type MatchSimulation from '../core/MatchSimulation'
import { type Team, type Player } from './entities.d'
import { type Vector } from './geometry'
/* eslint-disable @typescript-eslint/no-empty-interface */
export interface SirenAI {
  setShotAvailable: () => boolean
}

export interface ScoreboardAI {
  scoresLevel: () => boolean
  closeMargin: (maxMargin: 11 | number) => boolean
  wideMargin: (minMargin: 36 | number) => boolean
}

export interface MatchStateAI {}

export interface UmpireAI {}

export interface PlayerAI extends ScoreboardAI {
  teamInPossession: () => Team | null
  ownTeamInPossession: () => boolean
  opponentTeamInPossession: () => boolean
  contestedBall: () => boolean
  player: Player
  simulation: MatchSimulation
  getDestination: () => Vector
  isAwayPlayer: boolean
  isHomePlayer: boolean
  ownPosition: string | null
  getTarget: (close?: boolean) => Player
  canScore: () => boolean
  getOpponent: (position?: string) => Player
  getPositionOf: (player: Player) => string | null
  getOpponentOf: (player: Player) => Player | null
  getRandomPlayer: () => Player
}

export interface PlayerVisionAI {
  getNearestTeamMate: () => Player
  getNearestOpponent: () => Player
  getDistanceToNearestOpponent: () => number
  getDistanceToNearestTeamMate: () => number
  onBallCongestion: () => number
}

export interface PlayerInPossessionAI {
  underImmediatePressure: () => boolean
  hasFreeKick: () => boolean
}

export interface PlayerOffBallOffenseAI {
  canShepherd: (player: Player) => boolean
}

export interface PlayerOnBallOffenseAI extends PlayerOffBallOffenseAI {
  canTakePossession: () => boolean
}

export interface PlayerOffBallDefenseAI {
  canSpoil: () => boolean
}

export interface PlayerOnBallDefenseAI extends PlayerOffBallDefenseAI {
  canTackle: (player: Player) => boolean
  canBump: (player: Player) => boolean
}

export interface PlayerTagAI {}
