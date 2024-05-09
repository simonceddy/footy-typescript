import { type Attribute, type PlayerAttributes as PlayerAttributesType } from '../types/attributes'

export default class PlayerAttributes implements PlayerAttributesType {
  attributes = {}

  playerId: string

  constructor (playerId: string, attributes?: Record<string, Attribute>) {
    this.playerId = playerId
    if (attributes !== undefined) this.attributes = attributes
  }
}
