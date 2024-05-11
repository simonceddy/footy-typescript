import TeamColours from '../entities/TeamColours'
import { rand, randomRGB, randomRGBString, rgbString } from '../helpers'
import { type TeamColours as TeamColoursType } from '../types/entities'

function padZero (str: string, len?: number): string {
  len = len ?? 2
  const zeros = new Array(len).join('0')
  return (zeros + str).slice(-len)
}

function invertColor (r: number, g: number, b: number): string {
  // invert color components
  const r2 = (255 - r).toString(16)
  const g2 = (255 - g).toString(16)
  const b2 = (255 - b).toString(16)
  // pad each with zeros and return
  return '#' + padZero(r2) + padZero(g2) + padZero(b2)
}

export default function teamColoursFactory (colour1?: string, colour2?: string, colour3?: string): TeamColoursType {
  if (colour1 === undefined) {
    const [r1, g1, b1] = randomRGB()
    colour1 = rgbString(r1, g1, b1)
    if (colour2 === undefined) {
      colour2 = invertColor(r1, g1, b1)
    }
  }
  return new TeamColours(
    colour1,
    colour2 ?? randomRGBString(),
    colour3 ?? (rand(0, 1) === 1 ? undefined : randomRGBString())
  )
}
