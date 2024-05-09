import { type Vector, type Line as LineType } from '../types/geometry'

export default class Line implements LineType {
  start: Vector
  end: Vector

  constructor (start: Vector, end: Vector) {
    this.start = start
    this.end = end
  }
}
