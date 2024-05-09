import { type Footy } from '../types/entities'
import { type Player } from '../types/entities.d'

export default class Sherrin implements Footy {
  private possessor?: Player

  clearPossessor (): void {
    this.possessor = undefined
  }

  get contested (): boolean {
    return this.possessor === undefined
  }

  set inPossession (player: Player | undefined) {
    this.possessor = player
  }

  get inPossession (): Player | undefined {
    return this.possessor
  }
}
