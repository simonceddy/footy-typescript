import { type Footy } from '../types/entities'
import Vector from './Vector'

export default class FootyCoordinates extends Vector {
  footy: Footy

  constructor (footy: Footy, x: number, y: number) {
    super(x, y)
    this.footy = footy
  }
}
