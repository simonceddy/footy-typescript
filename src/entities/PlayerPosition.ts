import { type PlayerPosition as PlayerPositionType } from '../types/entities.d'

export default class PlayerPosition implements PlayerPositionType {
  constructor (public name: string) {}
}
