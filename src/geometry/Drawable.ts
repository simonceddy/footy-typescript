import {
  type Shape,
  type Line,
  type QuadraticCurve,
  type Arc,
  type BezierCurve
} from '../types/geometry'

function isLine (bit: Line | QuadraticCurve | Arc | BezierCurve): bit is Line {
  return (bit as Line).start !== undefined && (bit as Line).end !== undefined
}

function isQuadraticCurve (bit: Line | QuadraticCurve | Arc | BezierCurve): bit is QuadraticCurve {
  return (bit as QuadraticCurve).start !== undefined &&
    (bit as QuadraticCurve).end !== undefined &&
    (bit as QuadraticCurve).controlPoint1 !== undefined
}

function isBezierCurve (bit: Line | QuadraticCurve | Arc | BezierCurve): bit is BezierCurve {
  return (bit as BezierCurve).start !== undefined &&
    (bit as BezierCurve).end !== undefined &&
    (bit as BezierCurve).controlPoint1 !== undefined &&
    (bit as BezierCurve).controlPoint2 !== undefined
}

function isArc (bit: Line | QuadraticCurve | Arc | BezierCurve): bit is Arc {
  return (bit as Arc).r !== undefined && (bit as Arc).angle !== undefined
}

function bitToString (bit: Line | QuadraticCurve | Arc | BezierCurve, noMove: boolean = false): string {
  let d = noMove ? '' : `M ${bit.start.x} ${bit.start.y}`
  if (isArc(bit)) {
    d += ` A ${bit.r.x} ${bit.r.y} ${bit.angle} ${bit.largeArcFlag} ${bit.sweepFlag} ${bit.end.x} ${bit.end.y}`
  } else if (isBezierCurve(bit)) {
    d += ` C ${bit.controlPoint1.x} ${bit.controlPoint1.y} ${bit.controlPoint2.x} ${bit.controlPoint2.y} ${bit.end.x} ${bit.end.y}`
  } else if (isQuadraticCurve(bit)) {
    d += ` Q ${bit.controlPoint1.x} ${bit.controlPoint1.y} ${bit.end.x} ${bit.end.y}`
  } else if (isLine(bit)) {
    d += ` L ${bit.end.x} ${bit.end.y}`
  }
  return d
}

export default class Drawable implements Shape {
  path: Line[] | QuadraticCurve[] | Arc[] | BezierCurve[]

  closePath: boolean = false

  constructor (path: Line[] | QuadraticCurve[] | Arc[] | BezierCurve[], closePath: boolean = false) {
    this.path = path
    if (closePath) this.closePath = true
  }

  toString (): string {
    let d = ''

    if (this.path.length === 0) return d

    const bits = [...this.path]

    bits.forEach((l, id) => {
      if (l !== undefined) {
        d += `${bitToString(l, id !== 0)}`
      }
    })

    if (this.closePath) d += ' Z'

    return d
  }
}
