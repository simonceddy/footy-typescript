import { type Vector as VectorType } from '../types/geometry'

export default class Vector implements VectorType {
  x: number
  y: number

  constructor (x: number, y: number) {
    this.x = x
    this.y = y
  }
}
