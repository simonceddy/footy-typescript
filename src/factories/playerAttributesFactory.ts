import { type PlayerAttributes as PlayerAttributesType } from '../types/attributes'
import { type PlayerAttributeFactoryOptions, type PlayerAttributesFactoryAttributes } from '../types/factories'
import { PlayerAttributes } from '../attributes'
import { rand } from '../helpers'
// import { validAttributes } from '../support'
// import { AttributeType } from '../types/attributes.d'

// const attributeKeys = Object.keys(validAttributes)

export default function playerAttributesFactory (
  attributes?: PlayerAttributesFactoryAttributes,
  options?: PlayerAttributeFactoryOptions
): PlayerAttributesType {
  if (options?.noAttributes === true) {
    return new PlayerAttributes(attributes?.playerId ?? '')
  }
  // TODO make better
  const agility = attributes?.attributes?.agility ?? rand(3, 10, true)
  const speed = attributes?.attributes?.speed ?? rand(10 - agility, 10, true)
  const endurance = attributes?.attributes?.endurance ?? (rand((agility + speed) % 8 + 2, 9, true))
  const strength = attributes?.attributes?.strength ?? rand((agility + speed + endurance) % 8 + 2, 9, true)
  const skill = attributes?.attributes?.skill ?? rand((agility + strength) % 8 + 2, 9, true)
  const smarts = attributes?.attributes?.smarts ?? rand((endurance + agility + skill) % 8 + 2, 9, true)
  const overall = (agility + speed + endurance + strength + (skill * 2) + smarts) / 7

  return new PlayerAttributes(
    attributes?.playerId ?? '',
    {
      agility,
      speed,
      endurance,
      strength,
      skill,
      smarts,
      overall
    }
  )
}
