import { type TeamColours as TeamColoursType } from '../types/entities'

export default class TeamColours implements TeamColoursType {
  constructor (
    public colour1: string,
    public colour2: string,
    public colour3?: string
  ) {}
}
