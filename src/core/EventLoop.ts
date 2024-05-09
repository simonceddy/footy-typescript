import type EventEmitter from 'events'
import { type Clock } from '../types/core'
import type MatchSimulation from './MatchSimulation'
import { EndQuarter, StartMatch } from '../events'

export default class EventLoop {
  running: boolean = false

  constructor (public simulation: MatchSimulation) {
  }

  get clock (): Clock {
    return this.simulation.matchup.clock
  }

  get emitter (): EventEmitter {
    return this.simulation.eventEmitter
  }

  start (callback?: (sim: MatchSimulation) => void): void {
    this.emitter.emit(StartMatch.NAME, this.simulation)
    this.running = true
    let currentLoop = 0

    while (this.running) {
      if (callback !== undefined) callback(this.simulation)
      if (this.clock.currentTime >= (this.simulation.settings.msPerQuarter ?? 200000)) {
        this.emitter.emit(EndQuarter.NAME, this.simulation)
      }
      // console.log(`loop ${currentLoop}`)
      currentLoop++
      this.clock.tick(1000)
    }
    console.log(`loop took ${currentLoop} iterations`)
  }

  stop (): void {
    this.running = false
  }
}
