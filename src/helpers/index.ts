import { random, shuffle } from 'lodash'

export * as matchHelpers from './matchHelpers'

export function randomKey (arr: string[]): number {
  return Math.floor(Math.random() * arr.length)
}

export function randomVal (arr: string[]): string {
  return arr[randomKey(arr)]
}

export function randomUnusedVal (arr: string[], used: Array<string | null | undefined> = []): string {
  let val: string = randomVal(arr)

  // TODO avoid potential infinite loops
  while (used.includes(val)) {
    val = randomVal(arr)
  }

  return val
}

// TODO remove this pointless wrapper and just use lodash random directly
export function rand (min: number, max: number, floating: boolean = false): number {
  return random(min, max, floating)
}

export function randomRGB (): number[] {
  const r = rand(0, 255)
  const g = rand(0, 255)
  const b = rand(0, 255)
  return [r, g, b]
}

export function rgbString (r: number, g: number, b: number): string {
  return `rgb(${r}, ${g}, ${b})`
}

export function randomRGBString (): string {
  const [r, g, b] = randomRGB()
  return rgbString(r, g, b)
}

export function generateNumbers (max: number = 49): number[] {
  const nums: number[] = []
  new Int8Array(max).forEach((_v, num) => {
    nums.push(num + 1)
  })
  return shuffle(nums)
}
