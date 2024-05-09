import RuckContest from '../actions/RuckContest'
import { matchStates } from '../support'
import type ActionQueue from './ActionQueue'
import type MatchSimulation from './MatchSimulation'

export default class ProcessMatch {
  constructor (public queue: ActionQueue) {}

  private prepareQueue (simulation: MatchSimulation): void {
    if (simulation.state === matchStates.RUCK_CONTEST) {
      this.queue.push(new RuckContest(simulation))
    }
  }

  process (simulation: MatchSimulation): void {
    // TODO prepare queue elsewhere
    this.prepareQueue(simulation)
    if (!this.queue.isEmpty()) {
      const action = this.queue.shift()
      if (action !== undefined) {
        const next = action.process()
        if (next !== null) this.queue.push(next)
      }
    }
  }
}
