/* eslint-disable @typescript-eslint/no-unused-vars */
import fs from 'fs'
import path from 'path'
// import Table from 'cli-table'
// import PlayingList from './collections/PlayingList'
// import * as TJS from 'typescript-json-schema'
import { Kernel } from './core'
import { leagueFactory, fixtureFactory } from './factories'
import { inFieldOfPlay } from './helpers/matchHelpers'
import { random } from 'lodash'
// import { playingFieldSVG, renderHTML } from './support/html'
// import { type Player } from './types/entities'

// const program = TJS.getProgramFromFiles([path.resolve(__dirname, '../tsconfig.json')])

// const schema = TJS.generateSchema(program, 'MatchSchema')

// fs.writeFileSync(path.join(__dirname, '../storage/matchup-schema.json'), JSON.stringify(schema))

const footy = Kernel.init()

console.log(footy.name, footy.version)

const league = leagueFactory()
console.log(league.name)

const fixture = fixtureFactory(Object.values(league.teams), 18, true)
const match1 = fixture.match(1, 1)
if (match1?.homeTeam.homeground !== undefined) {
  console.log(inFieldOfPlay(match1?.homeTeam.homeground, {
    x: random(match1.homeTeam.homeground.xAxis),
    y: random(match1.homeTeam.homeground.yAxis)
  }), match1.homeTeam.homeground)
}
// if (match1 !== undefined) {
//   const sim = prepareMatchSimulation(matchToContainer(match1, league, footy), footy)
//   const result = footy.run(sim)
//   console.log(result.score)
//   fs.writeFileSync(path.join(__dirname, '../storage/result1.json'), JSON.stringify(result, undefined, '\t'))
// }
// const fixtureFilename = path.join(__dirname, '../storage/fixture.json')
// const leagueFilename = path.join(__dirname, '../storage/league.json')
// fs.writeFileSync(fixtureFilename, JSON.stringify(fixture, undefined, '\t'))
// fs.writeFileSync(leagueFilename, JSON.stringify(league, undefined, '\t'))
// const homeTeam = teamFactory()
// const awayTeam = teamFactory()
// const homeList = new PlayingList([], homeTeam)
// const awayList = new PlayingList([], awayTeam)

// for (let i = 0; i < 23; i += 1) {
//   homeList.add(playerFactory({ team: homeTeam }, {
//     takenNicknames: [...homeList.players]
//       .filter((player) => player.name.nickname !== null)
//       .map((player) => {
//         if (player.name.nickname === null) return ''
//         if (typeof player.name.nickname === 'string') return player.name.nickname
//         return player.name.nickname[0]
//       })
//   }))
//   awayList.add(playerFactory({ team: awayTeam }, {
//     takenNicknames: [...awayList.players]
//       .filter((player) => player.name.nickname !== null)
//       .map((player) => {
//         if (player.name.nickname === null) return ''
//         if (typeof player.name.nickname === 'string') return player.name.nickname
//         return player.name.nickname[0]
//       })
//   }))
// }

// const table = new Table({
//   head: [
//     `${homeTeam.location} ${homeTeam.name}`,
//     `${awayTeam.location} ${awayTeam.name}`
//   ],
//   colWidths: [60, 60]
// })

// table.push(...[...homeList.players].map((player, id) => ([
//   player.name.toString(),
//   awayList.players[id].name.toString()
// ])))

// // console.log(homeList[0]?.attributes)
// const html = renderHTML(
//   playingFieldSVG(playingFieldFactory(), 5),
//   `${homeTeam.location} ${homeTeam.name} VS ${awayTeam.location} ${awayTeam.name}`
// )

// fs.writeFileSync(path.join(__dirname, '../public/index.html'), html)
// console.log(table.toString())
