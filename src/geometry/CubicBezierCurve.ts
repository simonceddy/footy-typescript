import { type Vector, type BezierCurve } from '../types/geometry'
import Line from './Line'

export default class CubicBezierCurve extends Line implements BezierCurve {
  controlPoint2: Vector
  controlPoint1: Vector

  constructor (start: Vector, end: Vector, controlPoint1: Vector, controlPoint2: Vector) {
    super(start, end)
    this.controlPoint1 = controlPoint1
    this.controlPoint2 = controlPoint2
  }
}
