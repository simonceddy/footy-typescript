import { type PlayerAttributes } from './attributes'
import { type PlayingField } from './geometry'

export interface PersonName {
  firstName: string
  surname: string
  nickname?: | string | string[]
  toString: (noNickname?: boolean) => string
}

export interface TeamColours {
  colour1: string
  colour2: string
  colour3?: string
}

export interface Team {
  id: string
  location: string
  name: string
  shorthand: null | string
  toString: () => string
  colours?: TeamColours
  homeground?: PlayingField
}

export interface PlayerPosition {
  name: string
}

export interface Player {
  id: string
  name: PersonName
  team?: Team
  attributes?: PlayerAttributes
  number?: number
  height?: number
  positions?: string[]
}
export interface MatchUp {
  id?: string
  homeTeam: Team
  awayTeam: Team
}

export type Matches = MatchUp[]

export interface Round {
  matches: Matches
  teams: string[]
}

export interface Footy {
  inPossession?: Player
  contested: boolean
}

export interface PlayingList {
  players: Player[]
}

export interface League {
  teams: Record<string, Team>
  teamLists: Record<string, PlayingList>
  name: string
}
