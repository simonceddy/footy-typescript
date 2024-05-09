import { type Vector, type QuadraticCurve as QuadraticCurveType } from '../types/geometry.d'
import Line from './Line'

export default class QuadraticCurve extends Line implements QuadraticCurveType {
  controlPoint1: Vector

  constructor (start: Vector, end: Vector, controlPoint: Vector) {
    super(start, end)
    this.controlPoint1 = controlPoint
  }
}
