import { type Team, type PlayingList, type Player } from '../types/entities'

export default class TeamContainer {
  constructor (
    public team: Team,
    public playingList: PlayingList,
    public positionMap: Record<string, Player> = {}
  ) {}

  playersPosition (player: Player): string | null {
    const pos = Object.keys(this.positionMap).find((k) => this.positionMap[k].id === player.id)
    return pos ?? null
  }
}
