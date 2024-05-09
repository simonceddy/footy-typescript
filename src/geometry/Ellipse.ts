import { type Vector, type Ellipse as EllipseType } from '../types/geometry'

export default class Ellipse implements EllipseType {
  center: Vector
  radius: Vector

  constructor (center: Vector, radius: Vector) {
    this.center = center
    this.radius = radius
  }

  toString (mult: number = 1, stroke: string = 'black'): string {
    return `<ellipse stroke="${stroke}" style="fill: green;" cx="${this.center.x * mult}" cy="${this.center.y * mult}" rx="${this.radius.x * mult}" ry="${this.radius.y * mult}" />`
  }
}
