import { v4 as uuidv4 } from 'uuid'
import { Player } from '../entities'
import { type Player as PlayerType } from '../types/entities'
import { type PlayerFactoryAttributes, type PlayerFactoryOptions } from '../types/factories'
import personNameFactory from './personNameFactory'
import teamFactory from './teamFactory'
import { rand, randomVal } from '../helpers'
import { type PlayerAttributes as PlayerAttributesType } from '../types/attributes'
import { getOverallRating, positions } from '../support'
import { PlayerAttributes } from '../attributes'
import { averageAttributes, fillAttributes, getAttributesForPosition } from '../support/positionAttributes'

function getHeight (attributes: PlayerAttributesType): number {
  const baseHeight = rand(177, 196) + (
    typeof attributes.attributes.strength === 'number'
      ? rand(0, attributes.attributes.strength)
      : 0)
  if (baseHeight <= 183 && rand(0, 3) === 1) {
    return baseHeight - rand(1, 9)
  }
  if (baseHeight >= 190 && rand(0, 4) === 1) {
    return baseHeight + rand(6, 20)
  }
  return baseHeight
}

export default function playerFactory (
  attributes?: PlayerFactoryAttributes,
  options?: PlayerFactoryOptions
): PlayerType {
  const id: string = attributes?.id ?? uuidv4()

  const pos1 = attributes?.positions?.[0] !== undefined
    ? attributes.positions[0]
    : randomVal(Object.keys(positions.templates))

  let pos2 = attributes?.positions?.[1] !== undefined
    ? attributes.positions[1]
    : randomVal(Object.keys(positions.templates))

  while (pos1 === pos2) {
    pos2 = randomVal(Object.keys(positions.templates))
  }

  const playerAttributes = new PlayerAttributes(
    id,
    attributes?.attributes ?? averageAttributes(
      fillAttributes(getAttributesForPosition(pos1)),
      fillAttributes(getAttributesForPosition(pos2))
    )
  )

  playerAttributes.attributes.overall = getOverallRating(playerAttributes)

  const cm: number = attributes?.height ??
    playerAttributes.attributes.height ??
    Math.round(getHeight(playerAttributes))

  if (attributes?.team !== undefined) {
    return new Player(
      id,
      personNameFactory(attributes, options),
      playerAttributes,
      attributes?.team,
      attributes?.number,
      cm,
      [pos1, pos2]
    )
  }

  return new Player(
    id,
    personNameFactory(attributes, options),
    playerAttributes,
    options?.generateTeam === true ? teamFactory(attributes, options) : undefined,
    attributes?.number,
    cm,
    [pos1, pos2]
  )
}
