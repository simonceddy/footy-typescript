import { type Team } from '../types/entities'

interface Scoreline {
  team?: Team
  behinds: number
  goals: number
}

export default class Scoreboard {
  homeScore: Scoreline

  awayScore: Scoreline

  constructor (homeTeam?: Team, awayTeam?: Team) {
    this.awayScore = {
      behinds: 0,
      goals: 0,
      team: awayTeam
    }
    this.homeScore = {
      behinds: 0,
      goals: 0,
      team: homeTeam
    }
  }

  homeGoal (): void {
    this.homeScore.goals++
  }

  homeBehind (): void {
    this.homeScore.behinds++
  }

  homeTotal (): number {
    return this.homeScore.behinds + (this.homeScore.goals * 6)
  }

  awayGoal (): void {
    this.awayScore.goals++
  }

  awayBehind (): void {
    this.awayScore.behinds++
  }

  awayTotal (): number {
    return this.awayScore.behinds + (this.awayScore.goals * 6)
  }
}
