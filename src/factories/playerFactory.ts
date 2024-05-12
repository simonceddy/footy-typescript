import { v4 as uuidv4 } from 'uuid'
import { Player } from '../entities'
import { type Player as PlayerType } from '../types/entities'
import { type PlayerFactoryAttributes, type PlayerFactoryOptions } from '../types/factories'
import personNameFactory from './personNameFactory'
import teamFactory from './teamFactory'
import playerAttributesFactory from './playerAttributesFactory'
import { rand } from '../helpers'
import { type PlayerAttributes } from '../types/attributes'
import determinePlayerPositions from '../support/determinePlayerPositions'

function getHeight (attributes: PlayerAttributes): number {
  const baseHeight = rand(177, 196) + (
    typeof attributes.attributes.strength?.value === 'number'
      ? rand(0, attributes.attributes.strength.value)
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
  const playerAttributes = playerAttributesFactory({ ...attributes, playerId: id }, options)

  const cm = attributes?.height ?? Math.round(getHeight(playerAttributes))

  if (attributes?.team !== undefined) {
    return new Player(
      id,
      personNameFactory(attributes, options),
      playerAttributes,
      attributes?.team,
      attributes?.number,
      cm,
      determinePlayerPositions(playerAttributes, cm)
    )
  }

  return new Player(
    id,
    personNameFactory(attributes, options),
    playerAttributes,
    options?.generateTeam === true ? teamFactory(attributes, options) : undefined,
    attributes?.number,
    cm,
    determinePlayerPositions(playerAttributes, cm)
  )
}
