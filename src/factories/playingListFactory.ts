import PlayingList from '../collections/PlayingList'
import { generateNumbers } from '../helpers'
import { type Player, type PlayingList as PlayingListType } from '../types/entities'
import {
  type PlayingListFactoryOptions,
  type PlayingListFactoryAttributes
} from '../types/factories'
import playerFactory from './playerFactory'

export default function playingListFactory (
  attributes?: PlayingListFactoryAttributes,
  options?: PlayingListFactoryOptions
): PlayingListType {
  // TODO verify player data
  // TODO apply positions before attributes - calculate attributes by position
  const totalPlayers = options?.totalPlayers ?? 18
  const list = new PlayingList([], attributes?.team)
  const homeNums: number[] = generateNumbers()

  for (let i = 0; i < totalPlayers; i += 1) {
    const player: Player | null = attributes?.players !== undefined ? (attributes.players[i] ?? null) : null
    list.add(playerFactory({
      id: player?.id,
      firstName: player?.name?.firstName,
      surname: player?.name?.surname,
      nickname: player?.name?.nickname,
      team: attributes?.team,
      number: player?.number ?? homeNums[i],
      height: player?.height,
      positions: player?.positions,
      attributes: player?.attributes?.attributes
    }, {
      ...options,
      takenNicknames: [...list.players]
        .filter((player) => player.name.nickname !== null)
        .map((player) => {
          if (player.name.nickname === undefined) return ''
          if (typeof player.name.nickname === 'string') return player.name.nickname
          return player.name.nickname[0]
        })
    }))
  }

  return list
}
