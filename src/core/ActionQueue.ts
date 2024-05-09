import { type Action } from '../types/actions'

export default class ActionQueue {
  queue: Action[] = []

  push (action: Action): void {
    this.queue.push(action)
  }

  get length (): number {
    return this.queue.length
  }

  isEmpty (): boolean {
    return this.length === 0
  }

  shift (): Action | undefined {
    return this.queue.shift()
  }

  clear (): void {
    this.queue = []
  }
}
