/* eslint-disable @typescript-eslint/no-unused-vars */
import { v4 as uuidv4 } from 'uuid'
import { shuffle } from 'lodash'
import { type Matches, type Round, type Team } from '../types/entities'
import Fixture from '../entities/Fixture'

interface FixtureFactoryError {
  message: string
  round?: Round
}

export default function fixtureFactory (teams: Team[], rounds?: number, quiet: boolean = false): Fixture {
  const matchesPerRound = Math.round(teams.length / 2)

  const teamDir = Object.fromEntries(teams.map((t) => [t.id, t]))

  const totalRounds = rounds ?? teams.length

  const errors: FixtureFactoryError[] = []

  const ids: string[] = Object.keys(teamDir)

  const matchups: Record<string, Record<string, number>> = Object.fromEntries(
    ids.map((id) => ([
      id,
      Object.fromEntries(ids.filter((i) => i !== id).map((i) => [i, 0]))
    ]))
  )

  // const teamMatches: Record<string, string[]> = Object
  //   .fromEntries(teams.map((team) => [team.id, []]))

  const season: Record<number, Round> = {}

  const getNextOpponent = (teamId: string, round: number): string | undefined => {
    const usedTeams: string[] = season[round].teams
    const key = shuffle(ids).find((id) => (matchups[teamId][id] === 0 && !usedTeams.includes(id)))
    return key ?? shuffle(ids).find((id) => (matchups[teamId][id] < 2 && !usedTeams.includes(id)))
  }

  const roundsIterator = new Int8Array(totalRounds)

  roundsIterator.forEach((_v, id) => {
    const matches: Matches = []
    season[id + 1] = {
      matches,
      teams: []
    }
  })

  teams.forEach((homeTeam) => {
    roundsIterator.forEach((_v, id) => {
      const k = id + 1
      if (season[k] === undefined) {
        errors.push({ message: `undefined round ${k}` })
      } else if (!season[k].teams.includes(homeTeam.id)) {
        const awayTeamId = getNextOpponent(homeTeam.id, k)
        if (awayTeamId !== undefined) {
          const awayTeam = teamDir[awayTeamId]
          if (awayTeam.id === homeTeam.id) {
            errors.push({
              message: `${homeTeam.location} matched up with self!`,
              round: season[k]
            })
          } else if (season[k].teams.includes(awayTeam.id)) {
            errors.push({
              message: `duplicate team ${awayTeam.location}: ${awayTeam.id} in round ${k}`,
              round: season[k]
            })
          } else {
            season[k].matches.push({
              id: uuidv4(),
              homeTeam,
              awayTeam
            })
            // teamMatches[homeTeam.id].push(awayTeam.id)
            // teamMatches[awayTeam.id].push(homeTeam.id)
            matchups[homeTeam.id][awayTeam.id]++
            matchups[awayTeam.id][homeTeam.id]++
            season[k].teams.push(homeTeam.id)
            season[k].teams.push(awayTeam.id)
          }
        } else {
          errors.push({
            round: season[k],
            message: `undefined opponent for ${homeTeam.location} in round ${id + 1}`
          }
          )
        }
      }/*  else {
        console.log(`${homeTeam.location} already playing in round ${k} - skipping...`)
      } */
    })
  })

  const seasonObject: Record<number, Matches> = Object.fromEntries(Object.keys(season).map((round, id) => {
    if (season[round].matches.length !== matchesPerRound) {
      errors.push({
        message: `${season[round].matches.length} matches generated for round ${id + 1} does not match specified matches per round ${matchesPerRound}`,
        round: season[round]
      })
    }

    return [round, shuffle(season[round].matches)]
  }))
  // console.log(matchups)
  Object.keys(matchups).forEach((teamId) => {
    Object.keys(matchups[teamId]).forEach((opponentId) => {
      if (matchups[teamId][opponentId] === 0) {
        errors.push({
          message: `${teamDir[teamId].location}: ${teamId} does not play ${teamDir[opponentId].location}: ${opponentId}`
        })
      } else if (matchups[teamId][opponentId] > 2) {
        errors.push({
          message: `${teamDir[teamId].location}: ${teamId} plays ${teamDir[opponentId].location}: ${opponentId} too many times - ${matchups[teamId][opponentId]}`
        })
      }
    })
  })
  if (!quiet && errors.length > 0) errors.forEach((err) => { console.log(err.message) })

  return new Fixture(seasonObject)
}
