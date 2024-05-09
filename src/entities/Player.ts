import {
  type PersonName,
  type Team,
  type Player as PlayerType
} from '../types/entities'
import { type PlayerAttributes } from '../types/attributes'

export default class Player implements PlayerType {
  constructor (
    public id: string,
    public name: PersonName,
    public attributes: PlayerAttributes,
    public team?: Team,
    public number?: number,
    public height?: number,
    public positions?: string[]
  ) {}

  get surname (): string {
    return this.name.surname
  }

  get firstName (): string {
    return this.name.firstName
  }

  get nickname (): string | string[] | null {
    return this.name.nickname
  }
}
