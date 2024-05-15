import { type PlayerAttributes as PlayerAttributesType } from '../types/attributes'

export default class PlayerAttributes implements PlayerAttributesType {
  attributes: Record<string, number> = {}

  playerId: string

  constructor (playerId: string, attributes?: Record<string, number>) {
    this.playerId = playerId
    if (attributes !== undefined) this.attributes = attributes
  }
}
