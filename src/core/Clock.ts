import { type Clock as ClockType } from '../types/core'
import { type EventEmitter } from 'events'

export default class Clock implements ClockType {
  currentTime: number = 0

  eventEmitter: EventEmitter

  constructor (eventEmitter: EventEmitter) {
    this.eventEmitter = eventEmitter
  }

  tick (ms: number = 1): void {
    this.currentTime += ms
    this.eventEmitter.emit('clock.tick', this)
  }

  reset (): void {
    this.currentTime = 0
    this.eventEmitter.emit('clock.reset', this)
  }
}
