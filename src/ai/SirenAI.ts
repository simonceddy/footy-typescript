/* eslint-disable class-methods-use-this */
import { type SirenAI as SirenAIType } from '../types/ai.d'

export default class SirenAI implements SirenAIType {
  setShotAvailable (): boolean {
    return false
  }
}
