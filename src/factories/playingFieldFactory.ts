import { PlayingField, Vector } from '../geometry'
import Ellipse from '../geometry/Ellipse'
import { rand, randomVal } from '../helpers'
import { loadCSVResource } from '../resources'
import { type PlayingFieldFactoryAttributes } from '../types/factories'
import {
  type PlayingField as PlayingFieldType
} from '../types/geometry'

const nicknames = loadCSVResource('nicknames')
const teamNames = loadCSVResource('teamNames')
const locations = loadCSVResource('locations')
const firstNames = loadCSVResource('firstNames')
const surnames = loadCSVResource('surnames')

const stadiumNames = [
  'stadium',
  'cricket ground',
  'field',
  'park',
  'bowl',
  'arena',
  'oval',
  'dome'
]

function generatePlayingFieldName (location?: string): string {
  const roll = rand(1, 3)
  const sn = randomVal(stadiumNames)
  if (location !== undefined) return `${location} ${sn}`
  switch (roll) {
    case 1:
      return `${randomVal([...nicknames, ...teamNames])} ${sn}`
    case 2:
      return `${randomVal(locations)} ${sn}`
    case 3:
    default:
      return `${randomVal(firstNames)} ${randomVal(surnames)} ${sn}`
  }
}

export default function playingFieldFactory (
  attributes?: PlayingFieldFactoryAttributes
): PlayingFieldType {
  const width = attributes?.width ?? rand(110, 155)
  const length = attributes?.length ?? rand((width > 135 ? width : 135), 185)

  return new PlayingField(
    new Ellipse(new Vector(length / 2, width / 2), new Vector(length / 2, width / 2)),
    length,
    width,
    attributes?.name ?? generatePlayingFieldName(attributes?.location)
  )
}
