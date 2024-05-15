import { type PlayerAttributes } from '../types/attributes'

export default function getOverallRating (attributes: PlayerAttributes): number {
  const attributeKeys = Object.keys(attributes.attributes)
    .filter((key) => (key !== 'height' && key !== 'overall'))

  let total = 0
  attributeKeys.forEach((key) => {
    if (key !== 'height' && key !== 'overall') {
      total += attributes.attributes[key]
    }
  })
  return total / attributeKeys.length
}
