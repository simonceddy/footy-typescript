import { randomKey } from '../helpers'
import { type PersonName } from '../types/entities'

export default class PlayerName implements PersonName {
  firstName: string

  surname: string

  nickname: null | string | string[]

  constructor (firstName: string, surname: string, nickname: null | string | string[] = null) {
    this.firstName = firstName
    this.surname = surname
    if (nickname !== null) this.nickname = nickname
  }

  /**
   * Return the formatted player name
   * @returns {string}
   */
  toString (noNickname: boolean = false): string {
    let name = this.firstName
    if (!noNickname && this.nickname !== null) {
      if (typeof this.nickname === 'string') {
        name += ` "${this.nickname}"`
      } else {
        name += ` ${this.nickname[randomKey(this.nickname)]}`
      }
    }
    name += ` ${this.surname}`
    return name
  }
}
