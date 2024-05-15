import { random } from 'lodash'
import { templateKeys } from './positionTemplates'
import { playerAttributes } from './validAttributes'

function getRuckAttributes (): Record<string, number> {
  const height = random(194, 213)
  const rucking = random(6, 10, true)

  return {
    height,
    rucking,
    strength: random(5, 10, true),
    handball: random(4, 10, true)
  }
}

function getInsideMidAttributes (): Record<string, number> {
  return {
    strength: random(5, 10, true),
    awareness: random(5, 10, true),
    handball: random(5, 10, true),
    endurance: random(4, 10, true)
  }
}

function getOutsideMidAttributes (): Record<string, number> {
  return {
    kicking: random(5, 10, true),
    running: random(5, 10, true),
    awareness: random(4, 10, true),
    endurnce: random(4, 10, true)
  }
}

function getTaggerAttributes (): Record<string, number> {
  return {
    strength: random(4, 10, true),
    awareness: random(5, 10, true),
    endurance: random(5, 10, true),
    tagging: random(6, 10, true),
    defense: random(5, 10, true)
  }
}

function getKeyBackAttributes (): Record<string, number> {
  return {
    height: random(183, 200),
    strength: random(5, 10, true),
    defense: random(6, 10, true),
    marking: random(4, 10, true),
    awareness: random(4, 10, true),
    tagging: random(3, 10, true)
  }
}

function getRunningBackAttributes (): Record<string, number> {
  return {
    running: random(5, 10, true),
    defense: random(6, 10, true),
    endurance: random(4, 10, true),
    awareness: random(4, 10, true)
  }
}

function getKeyForwardAttributes (): Record<string, number> {
  return {
    height: random(183, 200),
    strength: random(5, 10, true),
    kicking: random(6, 10, true),
    marking: random(4, 10, true),
    scoring: random(5, 10, true)
  }
}

function getSmallForwardAttributes (): Record<string, number> {
  return {
    height: random(172, 190),
    strength: random(5, 10, true),
    kicking: random(6, 10, true),
    running: random(4, 10, true),
    scoring: random(5, 10, true)
  }
}

function getUtilityAttributes (): Record<string, number> {
  return {
    height: random(183, 197),
    strength: random(5, 10, true),
    kicking: random(5, 10, true),
    running: random(4, 10, true),
    handball: random(5, 10, true)
  }
}

// TODO
export function getAttributesForPosition (position: string): Record<string, number> {
  if (templateKeys[position] === undefined) {
    // error!
  }
  switch (position) {
    case templateKeys.RUCK:
      return getRuckAttributes()
    case templateKeys.INSIDE_MID:
      return getInsideMidAttributes()
    case templateKeys.OUTSIDE_MID:
      return getOutsideMidAttributes()
    case templateKeys.TAGGER:
      return getTaggerAttributes()
    case templateKeys.KEY_BACK:
      return getKeyBackAttributes()
    case templateKeys.KEY_FORWARD:
      return getKeyForwardAttributes()
    case templateKeys.SMALL_FORWARD:
      return getSmallForwardAttributes()
    case templateKeys.RUNNING_BACK:
      return getRunningBackAttributes()
    case templateKeys.UTILITY:
      return getUtilityAttributes()
    default:
  }
  return {}
}

export function fillAttributes (attributes: Record<string, number>): Record<string, number> {
  Object.keys(playerAttributes).forEach((key) => {
    if (attributes[key] === undefined) {
      attributes[key] = random(1, 10, true)
    }
  })

  return attributes
}

export function averageAttributes (
  attributes1: Record<string, number>,
  attributes2: Record<string, number>
): Record<string, number> {
  const averages = {}
  Object.keys(playerAttributes).forEach((key) => {
    if (attributes1[key] !== undefined) {
      averages[key] = attributes2[key] === undefined
        ? attributes1[key]
        : (attributes1[key] + attributes2[key]) / 2
    } else if (attributes2[key] !== undefined) {
      averages[key] = attributes2[key]
    }
  })

  return averages
}
