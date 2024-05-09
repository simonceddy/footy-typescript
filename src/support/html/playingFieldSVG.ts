import { type PlayingField } from '../../types/geometry'
import svgFiftyMeterLines from './svgFiftyMeterLines'

export default function playingFieldSVG (playingField: PlayingField, mult: number = 1): string {
  const svgSize = 200 * mult
  const l = playingField.xAxis * mult
  const w = playingField.yAxis * mult
  const mL = (svgSize - l) / 2
  const mW = (svgSize - w) / 2
  const csx = ((playingField.xAxis / 2) - 25) * mult
  const csy = ((playingField.yAxis / 2) - 25) * mult
  const svg = `
  <svg width="${svgSize}" height="${svgSize}" viewbox="0,0,${svgSize},${svgSize}" style="width: 98%; height: 98%;">
    <g style="transform: translate(${mL}px, ${mW}px);">
      ${playingField.shape.toString(mult)}
      <g id="scale-lines">
        <path style="stroke: red; stroke-width: 0.2rem; fill:none;" d="M 0 0 L 0 20 M 0 1 L ${l} 1 M ${l} 0 L ${l} 20"></path>
        <path style="stroke: red; stroke-width: 0.2rem; fill:none;" d="M ${l} 0 L ${l - 10} 0 M ${l - 1} 0 L ${l - 1} ${w} M ${l} ${w} L ${l - 10} ${w}"></path>
        <text x="${l / 2}" y="30" style="fill: red; stroke: black; font-size: 1rem; font-family:Arial, Helvetica, sans-serif; text-align:center">
            ${playingField.xAxis} meters
        </text>
        <text x="${l - (l / 5)}" y="${w / 2.5}" style="fill: red; stroke: black; font-size: 1rem; font-family:Arial, Helvetica, sans-serif;">
            ${playingField.yAxis} meters
        </text>
      </g>
      ${svgFiftyMeterLines(playingField, mult)}
      <rect x="${csx}" y="${csy}" width="${50 * mult}" height="${50 * mult}" style="fill: none; stroke: black;"></rect>
        
      <ellipse cx="${l / 2}" cy="${w / 2}" rx="${mult * 5}" ry="${mult * 5}" style="fill: none; stroke: black;"></ellipse>
      <ellipse cx="${l / 2}" cy="${w / 2}" rx="${mult * 1.5}" ry="${mult * 1.5}" style="fill: none; stroke: black;"></ellipse>

      <g id="player-markers">

      </g>
    </g>
  </svg>
  `

  return svg
}
