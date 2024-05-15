import EventEmitter from 'events'
import { Clock } from '../core'
import MatchContainer from '../core/MatchContainer'
import { type Match } from '../types/core'
import { type League, type MatchUp } from '../types/entities'
import TeamContainer from '../core/TeamContainer'
import { playingFieldFactory } from '../factories'
import * as positionsSupport from './positions'
import { positionTemplates, templateKeys } from './positionTemplates'

export { default as KeyValuePair } from './KeyValuePair'
export * as html from './html'
export * as constants from './consts'
export { default as validAttributes } from './validAttributes'
export { default as getOpposingPosition } from './getOpposingPosition'
export { default as getOverallRating } from './getOverallRating'

export function matchToContainer (match: MatchUp, league: League, emitter?: EventEmitter): Match {
  const homeTeamList = league.teamLists[match.homeTeam.location]
  const awayTeamList = league.teamLists[match.awayTeam.location]
  const homeTeamContainer = new TeamContainer(
    match.homeTeam,
    homeTeamList
  )
  const awayTeamContainer = new TeamContainer(
    match.awayTeam,
    awayTeamList
  )
  return new MatchContainer(
    new Clock(emitter ?? new EventEmitter()),
    homeTeamContainer,
    awayTeamContainer,
    match.homeTeam.homeground ?? playingFieldFactory()
  )
}

export const positionKeys: string[] = Object.keys(positionsSupport)

export const positions = {
  ...positionsSupport,
  templates: positionTemplates,
  templateKeys
}

export const matchStates = {
  RUCK_CONTEST: 'RUCK_CONTEST',
  SET_SHOT: 'SET_SHOT',
  FREE_KICK: 'FREE_KICK',
  RUNNING_PLAY: 'RUNNING_PLAY',
  BALL_IN_POSSESSION: 'BALL_IN_POSSESSION',
  BALL_IN_PROTECTED_POSSESSION: 'BALL_IN_PROTECTED_POSSESSION',
  BALL_CONTESTED: 'BALL_CONTESTED',
  BALL_IN_FLIGHT: 'BALL_IN_FLIGHT',
  BALL_IN_SPACE: 'BALL_IN_SPACE'
}
