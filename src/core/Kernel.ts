/* eslint-disable class-methods-use-this */
import { EventEmitter } from 'events'
import { FOOTYJS_VERSION, FOOTYJS_NAME } from '../support/consts'
import { type MatchResult, type Kernel as KernelType } from '../types/core.d'
import type MatchSimulation from './MatchSimulation'
import EventLoop from './EventLoop'
import initCoreEvents from './bootstrap/initCoreEvents'
import { EndMatch, EndQuarter, StartMatch } from '../events'
import ProcessMatch from './ProcessMatch'
import ActionQueue from './ActionQueue'
import StartQuarter from '../events/StartQuarter'
import { matchStates } from '../support'
import prepareResults from './results/prepareResults'

export default class Kernel extends EventEmitter implements KernelType {
  get name (): string {
    return FOOTYJS_NAME
  }

  get version (): string {
    return FOOTYJS_VERSION
  }

  run (simulation: MatchSimulation): MatchResult {
    const eventLoop = new EventLoop(simulation)
    const actionQueue = new ActionQueue()
    const matchProcessor = new ProcessMatch(actionQueue)
    this.on(StartQuarter.NAME, (sim: MatchSimulation) => {
      // TODO reset player positions
      sim.state = matchStates.RUCK_CONTEST
    })
    this.on(StartMatch.NAME, (sim: MatchSimulation) => {
      this.emit(StartQuarter.NAME, sim)
    })
    this.on(EndQuarter.NAME, (sim: MatchSimulation) => {
      sim.currentQuarter++
      sim.clock.reset()
      if (sim.currentQuarter > (sim.settings.quarters ?? 4)) {
        this.emit(EndMatch.NAME, sim)
      } else this.emit(StartQuarter.NAME, sim)
    })
    this.on(EndMatch.NAME, () => {
      eventLoop.stop()
      actionQueue.clear()
    })
    eventLoop.start((sim: MatchSimulation) => {
      matchProcessor.process(sim)
    })

    return prepareResults(simulation)
  }

  static init (): Kernel {
    return initCoreEvents(new Kernel())
  }
}
