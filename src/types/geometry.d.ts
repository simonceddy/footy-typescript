export interface Vector {
  x: number
  y: number
}

export interface Line {
  start: Vector
  end: Vector
}

export interface QuadraticCurve extends Line {
  controlPoint1: Vector
}

export interface BezierCurve extends QuadraticCurve {
  controlPoint2: Vector
}

export interface Arc extends Line {
  angle: number
  r: Vector
  largeArcFlag: 0 | 1
  sweepFlag: 0 | 1
}

export interface Shape {
  path: Line[] | Arc[] | QuadraticCurve[] | BezierCurve[]
  closePath: false | boolean
  toString: () => string
}

export interface Ellipse {
  center: Vector
  radius: Vector
  toString: (mult?: number) => string
}

export interface PlayingField {
  shape: Ellipse
  yAxis: number
  xAxis: number
  center: Vector
  radius: Vector
  name?: string
}
