import type EventEmitter from 'events'
import { type Match } from '../../types/core'
import MatchSimulation from '../MatchSimulation'
import preparePlayingField from './preparePlayingField'

export default function prepareMatchSimulation (match: Match, eventEmitter: EventEmitter): MatchSimulation {
  return new MatchSimulation(eventEmitter, match, preparePlayingField(match, true))
}
