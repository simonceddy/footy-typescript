import * as path from 'path'
import * as fs from 'fs'

/** Bogan cache object */
const cache = {}

function csvToArray (filename: string): string[] {
  if (!fs.existsSync(filename)) {
    throw new Error(`Unable to locate resource: ${filename}`)
  }
  return fs.readFileSync(filename).toString().split(',')
}

export const RESOURCE_PATH: string = path.resolve(__dirname, '../../resources')

/**
 * Load a CSV file into an array
 * @param {string} name
 * @returns {string[]}
 */
export function loadCSVResource (name: string): string[] {
  if (cache[name] !== undefined) return cache[name]
  const fn: string = path.join(RESOURCE_PATH, (!name.endsWith('.csv') ? `${name}.csv` : name))
  const data: string[] = csvToArray(fn)
  cache[name] = data
  return data
}
