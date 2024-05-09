interface Scoreline {
  behinds: number
  goals: number
}

export default class Scoreboard {
  homeScore: Scoreline

  awayScore: Scoreline

  constructor () {
    this.awayScore = {
      behinds: 0,
      goals: 0
    }
    this.homeScore = {
      behinds: 0,
      goals: 0
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
