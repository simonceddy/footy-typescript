import path from 'path'
import fs from 'fs'
import { RESOURCE_PATH } from '../../resources'

export { default as playingFieldSVG } from './playingFieldSVG'

export const templatePath = path.join(RESOURCE_PATH, 'html/template.html')

export { default as overviewPage } from './overviewPage'

export function renderHTML (body: string, title?: string, heading?: string): string {
  if (!fs.existsSync(templatePath)) {
    throw new Error(`Unable to locate template at ${templatePath}`)
  }
  const html = fs.readFileSync(templatePath)
    .toString()
    .replace(/{{\$title}}/g, title ?? '')
    .replace(/{{\$heading}}/g, heading ?? title ?? '')
    .replace('{{$body}}', body)

  return html
}

export { default as matchupHeading } from './matchupHeading'
