import { type TeamColours, type Team as TeamInterface } from '../types/entities'
import { type PlayingField } from '../types/geometry'

export default class Team implements TeamInterface {
  constructor (
    public id: string,
    public location: string,
    public name: string,
    public shorthand: null | string = null,
    public colours?: TeamColours,
    public homeground?: PlayingField
  ) {}

  toString (): string {
    return `${this.location} ${this.name}`
  }
}
