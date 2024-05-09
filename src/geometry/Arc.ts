import { type Vector, type Arc as ArcType } from '../types/geometry.d'
import Line from './Line'

export default class Arc extends Line implements ArcType {
  r: Vector
  largeArcFlag: 0 | 1
  sweepFlag: 0 | 1
  angle: number

  constructor (
    r: Vector,
    start: Vector,
    end: Vector,
    angle: number,
    largeArcFlag: 0 | 1 = 1,
    sweepFlag: 0 | 1 = 1
  ) {
    super(start, end)
    this.r = r
    this.angle = angle
    this.largeArcFlag = largeArcFlag
    this.sweepFlag = sweepFlag
  }
}
