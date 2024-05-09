import { type PlayingField as PlayingFieldType, type Ellipse, type Vector } from '../types/geometry'

export default class PlayingField implements PlayingFieldType {
  xAxis: number

  yAxis: number

  constructor (public shape: Ellipse, xAxis?: number, yAxis?: number, public name?: string) {
    this.xAxis = xAxis ?? shape.radius.x * 2
    this.yAxis = yAxis ?? shape.radius.y * 2
  }

  get center (): Vector {
    return this.shape.center
  }

  get radius (): Vector {
    return this.shape.radius
  }
}
