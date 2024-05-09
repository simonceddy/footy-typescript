import { shuffle } from 'lodash'
import { type PlayerAttributes } from '../types/attributes'

const positionGuides: Record<string, Record<string, number>> = {
  ruck: {
    height: 194,
    strength: 5,
    agility: 4
  },
  tallMid: {
    heigh: 190,
    skill: 6,
    smarts: 6,
    endurance: 5
  },
  keyPosition: {
    strength: 7,
    smarts: 5,
    endurance: 4,
    height: 185
  },
  outsideMid: {
    speed: 5,
    agility: 4,
    skill: 6,
    smarts: 5,
    under_height: 196
  },
  insideMid: {
    under_height: 196,
    skill: 7,
    smarts: 7,
    strength: 6
  },
  smallForward: {
    under_height: 190,
    speed: 6,
    skill: 5,
    smarts: 5,
    strength: 4
  },
  wing: {
    speed: 6,
    skill: 5,
    endurance: 6
  },
  tagger: {
    under_height: 198,
    strength: 6,
    endurance: 6,
    smarts: 7
  },
  backline: {
    smarts: 4,
    agility: 4,
    height: 182
  },
  halfForward: {
    strength: 4,
    speed: 4,
    endurance: 4,
    agility: 4
  },
  runningBack: {
    speed: 6,
    skill: 5,
    agility: 4
  }
}
const positions = Object.keys(positionGuides)

const compareToTemplate = (attributes: Record<string, number>, template: Record<string, number>): boolean => {
  const templateAttributes = Object.keys(template)
  const matchingAttributes = templateAttributes.filter((attribute) => {
    if (attribute.startsWith('under_')) {
      const a = attribute.replace('under_', '')
      return (
        attributes[a] !== undefined && attributes[a] < template[a]
      )
    }
    return (
      attributes[attribute] !== undefined && attributes[attribute] > template[attribute]
    )
  })

  return matchingAttributes.length === templateAttributes.length
}

export default function determinePlayerPositions (player: PlayerAttributes, height: number): string[] {
  // const heightToRuck = height > 194

  const strength = Number(player.attributes.strength?.value ?? 6)
  const agility = Number(player.attributes.agility?.value ?? 5)
  const speed = Number(player.attributes.speed?.value ?? 5)
  const endurance = Number(player.attributes.endurance?.value ?? 5)
  const skill = Number(player.attributes.skill?.value ?? 5)
  const smarts = Number(player.attributes.smarts?.value ?? 5)

  const playerPositions: string[] = []
  positions.forEach((pos) => {
    if (compareToTemplate({
      strength, agility, speed, skill, smarts, endurance, height
    }, positionGuides[pos])) {
      playerPositions.push(pos)
    }
  })

  return shuffle(playerPositions).slice(0, 3)
}
