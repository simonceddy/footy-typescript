/* eslint-disable @typescript-eslint/no-empty-interface */
// import { type Attribute } from './attributes'
import { type Player, type Team } from './entities'
import { type PlayingField } from './geometry'

export interface TeamFactoryAttributes {
  teamName?: string | undefined
  location?: string | undefined
  shorthand?: string | undefined
  homeground?: PlayingField
  colour1?: string
  colour2?: string
  colour3?: string
  id?: string
}

export interface TeamFactoryOptions {
  takenTeamNames?: string[] | undefined
  takenLocations?: string[] | undefined
}

export interface PersonNameFactoryAttributes {
  firstName?: string | undefined
  surname?: string | undefined
  nickname?: undefined | string | string[]
}

export interface PersonNameFactoryOptions {
  takenNicknames?: Array<string | null | undefined> | undefined
  noNickname?: false | boolean
}

export interface PlayerFactoryAttributes extends PersonNameFactoryAttributes, TeamFactoryAttributes, PlayerAttributesFactoryAttributes {
  team?: Team | undefined
  number?: number
  height?: number
  id?: string
  positions?: string[]
}

export interface PlayerFactoryOptions extends PersonNameFactoryOptions, TeamFactoryOptions, PlayerAttributeFactoryOptions {
  generateTeam?: true | boolean
}

export interface PlayerAttributesFactoryAttributes {
  playerId?: string
  attributes?: Record<string, number>
}

export interface PlayerAttributeFactoryOptions {
  noAttributes?: boolean
}

export interface PlayingFieldFactoryAttributes {
  width?: number
  length?: number
  name?: string
  location?: string
}

export interface PlayingListFactoryAttributes {
  team?: Team
  players?: Player[]
}

export interface PlayingListFactoryOptions {
  totalPlayers: number
}

export interface MatchupFactoryAttributes extends
  PlayerAttributesFactoryAttributes,
  PlayerFactoryAttributes,
  PersonNameFactoryAttributes {
  id?: string
  homeTeamAttributes?: TeamFactoryAttributes
  awayTeamAttributes?: TeamFactoryAttributes
  homePlayingList?: Player[]
  awayPlayingList?: Player[]
  playingFieldAttributes?: PlayingFieldFactoryAttributes
}

export interface MatchupFactoryOptions extends
  PlayerAttributeFactoryOptions,
  PlayerFactoryOptions,
  PersonNameFactoryOptions,
  TeamFactoryAttributes
{}

export interface LeagueFactoryAttributes {
  name?: string
}

export interface LeagueFactoryOptions {
  totalTeams?: number
  totalPlayersPerTeam?: number
}
