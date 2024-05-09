import { type Team, type League as LeagueType, type PlayingList } from '../types/entities.d'

export default class League implements LeagueType {
  constructor (
    public name: string,
    public teams: Record<string, Team>,
    public teamLists: Record<string, PlayingList>
  ) {}
}
