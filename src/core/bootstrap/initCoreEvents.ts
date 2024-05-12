import FreeKick from '../../actions/FreeKick'
import Handball from '../../actions/Handball'
import Hitout from '../../actions/Hitout'
import Kick from '../../actions/Kick'
import Mark from '../../actions/Mark'
import Spoil from '../../actions/Spoil'
import Tackle from '../../actions/Tackle'
import { EndMatch, EndQuarter, StartMatch } from '../../events'
import BehindScored from '../../events/BehindScored'
import GoalScored from '../../events/GoalScored'
import StartQuarter from '../../events/StartQuarter'
import { setStartingPositions } from '../../helpers/matchHelpers'
import { type Kernel } from '../../types/core'
import { type Player } from '../../types/entities'
import type MatchSimulation from '../MatchSimulation'

const statHandler = (stat: string) => (simulation: MatchSimulation, player: Player) => {
  simulation.stats.addStatForPlayer(stat, player)
}

function resetPositions (simulation: MatchSimulation): void {
  setStartingPositions(simulation.matchup, simulation.coordinates)
}

export default function initCoreEvents (eventEmitter: Kernel): Kernel {
  // TODO
  eventEmitter.on(StartMatch.NAME, (simulation: MatchSimulation) => {
    console.log(`match between ${simulation.matchup.homeTeam.name} and ${simulation.matchup.awayTeam.name} at the glorious ${simulation.matchup.playingField.name} started`)
  })
  eventEmitter.on(EndQuarter.NAME, (simulation: MatchSimulation) => {
    console.log(`quarter ${simulation.currentQuarter} ended`)
  })
  eventEmitter.on(EndMatch.NAME, (simulation: MatchSimulation) => {
    console.log(`match between ${simulation.matchup.homeTeam.name} and ${simulation.matchup.awayTeam.name} finished`)
  })
  eventEmitter.on(StartQuarter.NAME, (simulation: MatchSimulation) => {
    console.log(`starting quarter ${simulation.currentQuarter}`)
  })

  eventEmitter.on(BehindScored.NAME, statHandler('behind'))

  eventEmitter.on(GoalScored.NAME, statHandler('goal'))
  eventEmitter.on(GoalScored.NAME, resetPositions)
  eventEmitter.on(StartQuarter.NAME, resetPositions)

  eventEmitter.on(BehindScored.NAME, (simulation: MatchSimulation, player: Player) => {
    player.team?.id === simulation.matchup.homeTeam.id
      ? simulation.scores.homeBehind()
      : simulation.scores.awayBehind()
  })

  eventEmitter.on(GoalScored.NAME, (simulation: MatchSimulation, player: Player) => {
    player.team?.id === simulation.matchup.homeTeam.id
      ? simulation.scores.homeGoal()
      : simulation.scores.awayGoal()
  })

  eventEmitter.on(Kick.NAME, statHandler('kick'))
  eventEmitter.on(Handball.NAME, statHandler('handball'))
  eventEmitter.on(Hitout.NAME, statHandler('hitout'))
  eventEmitter.on(Spoil.NAME, statHandler('spoil'))
  eventEmitter.on(Tackle.NAME, statHandler('tackle'))
  eventEmitter.on(Mark.NAME, statHandler('mark'))
  eventEmitter.on(FreeKick.NAME, statHandler('freesFor'))

  return eventEmitter
}
