import { v4 as uuidv4 } from 'uuid'
import { Team } from '../entities'
import { rand, randomVal } from '../helpers'
import { loadCSVResource } from '../resources'
import { type TeamFactoryAttributes, type TeamFactoryOptions } from '../types/factories'
import teamColoursFactory from './teamColoursFactory'
import playingFieldFactory from './playingFieldFactory'

const teamNames = loadCSVResource('teamNames')
const locations = loadCSVResource('locations')

function randomLocation (): string {
  return randomVal(locations)
}

function getUniqueLocation (taken: string[] = []): string {
  let location = randomLocation()

  while (taken.includes(location)) {
    location = randomLocation()
  }

  return location
}

function randomTeamName (): string {
  return randomVal(teamNames)
}

function getUniqueTeamName (taken: string[] = []): string {
  let teamName = randomTeamName()

  while (taken.includes(teamName)) {
    teamName = randomTeamName()
  }

  return teamName
}

/**
 * Create a new Team entity
 * @param {import('../types').Factories.TeamFactoryAttributes} attributes
 * @param {import('../types').Factories.TeamFactoryOptions} options
 * @returns {Team}
 */
export default function teamFactory (
  attributes: TeamFactoryAttributes | undefined = undefined,
  options: TeamFactoryOptions | undefined = undefined
): Team {
  const id = uuidv4()
  // TODO clean up this
  const location = attributes !== undefined && typeof attributes.location === 'string'
    ? attributes.location
    : getUniqueLocation(
      options?.takenLocations ?? []
    )
  const name = attributes !== undefined && typeof attributes.teamName === 'string'
    ? attributes.teamName
    : getUniqueTeamName(
      options?.takenTeamNames ?? []
    )
  return new Team(
    id,
    location,
    name,
    null,
    teamColoursFactory(
      attributes?.colour1,
      attributes?.colour2,
      attributes?.colour3
    ),
    playingFieldFactory({
      location: attributes?.location ?? (rand(0, 2) === 1 ? location : undefined)
    })
  )
}
