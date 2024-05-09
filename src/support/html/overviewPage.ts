import type PlayingList from '../../collections/PlayingList'
import { type PlayingField } from '../../types/geometry'
import playingFieldSVG from './playingFieldSVG'

export default function overviewPage (
  homePlayingList: PlayingList,
  awayPlayingList: PlayingList,
  playingField: PlayingField
): string {
  const renderHomeList = (): string[] => (
    homePlayingList.players.map((player) => `<span class="player-name">${player.name.toString()}</span>`)
  )
  const renderAwayList = (): string[] => (
    awayPlayingList.players.map((player) => `<span class="player-name">${player.name.toString()}</span>`)
  )

  const html = `
  <div id="team-playing-list" style="width: 20%; height: 100%; padding: 1rem;">
    <button id="playing-list-team-button" type="button">Home</button>
    <div id="home-team-playing-list" class="playing-list" style="display: flex; flex-direction: column; justify-content: start; align-items: start; width: 100%;">
      ${renderHomeList().join('\n')}
    </div>
    <div id="away-team-playing-list" class="playing-list" style="display: none; flex-direction: column; justify-content: start; align-items: start; width: 100%;">
      ${renderAwayList().join('\n')}
    </div>
  </div>
  <div style="width: 80%; height: 100%;">
    ${playingFieldSVG(playingField, 4)}
  </div>
`
  return html
}
