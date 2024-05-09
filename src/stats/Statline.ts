import { type Player } from '../types/entities'
import { type Statline as StatlineType } from '../types/stats'

export default class Statline implements StatlineType {
  constructor (
    public player: Player,
    public stats: Record<string, number>
  ) {}

  get playerId (): string {
    return this.player.id
  }
}
