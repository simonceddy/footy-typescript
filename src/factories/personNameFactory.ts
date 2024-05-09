import { type PersonName as PersonNameType } from '../types/entities'
import {
  type PersonNameFactoryOptions,
  type PersonNameFactoryAttributes
} from '../types/factories'
import { PersonName } from '../entities'
import { randomVal, randomUnusedVal } from '../helpers'
import { loadCSVResource } from '../resources'

const firstNames = loadCSVResource('firstNames')
const surnames = loadCSVResource('surnames')
const nicknames = loadCSVResource('nicknames')

export default function personNameFactory (
  attributes: PersonNameFactoryAttributes | undefined = undefined,
  options: PersonNameFactoryOptions | undefined = undefined
): PersonNameType {
  return new PersonName(
    attributes?.firstName ?? randomVal(firstNames),
    attributes?.surname ?? randomVal(surnames),
    options?.noNickname === true
      ? null
      : attributes?.nickname ?? randomUnusedVal(nicknames, options?.takenNicknames)
  )
}
