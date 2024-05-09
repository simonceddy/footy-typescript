import { type Match } from '../../types/core'

export default function matchupHeading (match: Match): string {
  return `
  <span id="header-home-team-location" class="header-team-location">${match.homeTeam.location}</span>
  <span id="header-home-team-name" class="header-team-name">${match.homeTeam.name}</span>
  <span id="header-vs">VS</span>
  <span id="header-away-team-location" class="header-team-location">${match.awayTeam.location}</span>
  <span id="header-away-team-name" class="header-team-name">${match.awayTeam.name}</span>
  `
}
