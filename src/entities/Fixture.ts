import { type MatchUp, type Matches } from '../types/entities'

export default class Fixture {
  constructor (
    public rounds: Record<number, Matches>
  ) {}

  match (round: number, match: number): MatchUp | undefined {
    const r = this.rounds[String(round)]
    if (r !== undefined) return r[match - 1]
    return undefined
  }
}
