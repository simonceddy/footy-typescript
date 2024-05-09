import { type PlayingField } from '../../types/geometry'

export default function svgFiftyMeterLines (playingField: PlayingField, mult: number = 1): string {
  const fifty = 50 * mult
  const l = playingField.xAxis * mult
  const w = playingField.yAxis * mult
  const cL = l / 10
  const cW = w / 10
  const html: string = `
  <g id="fifty-lines">
    <path style="stroke: black; fill:none;" d="M 0 0 C ${cL} ${cW / 2} ${fifty} ${cW * 2} ${fifty} ${w / 2} C ${fifty} ${w - (cW * 2)} ${cL} ${w - (cW / 2)} 0 ${w}"></path>
    <path style="stroke: black; fill:none;" d="M ${l} 0 C ${l - cL} ${cW / 2} ${l - fifty} ${cW * 2} ${l - fifty} ${w / 2} C ${l - fifty} ${w - (cW * 2)} ${l - cL} ${w - (cW / 2)} ${l} ${w}"></path>
  </g> 
  `

  return html
}
