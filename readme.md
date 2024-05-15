# Footy typescript thing

This repo contains my latest attempt at simulating an [AFL](https://en.wikipedia.org/wiki/Australian_Football_League) match.

The simulation runs by generating Actions that correspond to an on field event or a change in match state, then processing those actions within an event loop. Which action happens next is determined by the prior action and random number generators, with the eventual goal of factoring in player attributes, entity positions on an xy grid, and match state. It's like one big decision tree.

## Current Feature State

Current features include:

- Factories for generating players, teams, matchups and leagues
- Basic simulation based entirely on RNG
- Basic simulations from user submitted matchups
- Express server with API routes for factories, match simulation, and setup for a simple [react client](https://github.com/simonceddy/footy-client)

## Current Issues

- When generating a league the factory will attempt to create a fixture. The fixture is not optimised and this nearly always results in some matchups missing and some rounds with less matches than others.
- Simulations are currently based on random number generation and fairly basic
- Simulations will often cause several players to amass record setting statlines and several other players to have no stats at all
- Scoring is too low in most simulations
- The basis for a coordinates system for moving entities is in place but is currently not implemented. At present all entities stay in the same locations
- Generation of attributes and position determination is rudimentary and often results in poor distribution of positions
- Still some bugs with simulating user submitted matchups
- Various poorly optimised code and typescript rookie mistakes

## Future Goals

- Make the simulation take into account player attributes when determining next actions
- Improvements and additions to actions
- Simulate entity movement around the playing field
- Give player entities awareness of their position on the playing field and factor this into determining next actions
- Implement match state awareness e.g. how far in front/behind a players team is
- Implement clock awareness e.g. how long is left in a quarter/match
- Better attributes generation and position determination, likely including changes to valid attributes
- Ability to set certain config via dot file like .env
- Add some algorithmic name generation instead of solely using static data
- Use better caching for data used by generators
- Pseudo parallel action generation and handling ideally allowing individual entities to have their own actions and thus move around the xy grid
- General improvements and optimisations
- Proper error handling - currently the app will just crash when encountering an error
- Better typescripting as I learn more

## Requirements

- Up to date NodeJS
- Typescript

## Running the server

1. Clone repo
2. Run `npm run install` to install dependencies
3. Run `tsc` to build
4. (Optional/Recommended) Clone the [client](https://github.com/simonceddy/footy-client), run `npm run install && npm run build`, then move the resulting client directory to this repos root directory - the API will still work without this - [more info here](#client)
5. Run `npm run server`
6. In your browser goto `http://localhost:18727` to see the client (or an error if you haven't setup the client)

## Current server setup

Unlike the main code, the server is still in commonJS and does not require any building. The entry file is `server/serve.js`.

The server can be run with `npm run server`, which will be accessible at `http://localhost:18727`

### Routing

- `GET /api/factory/player` - generates a random player entity
- `GET /api/factory/match` - generates a random match between two teams
- `GET /api/factory/league` - generates an entire league of 18 teams
- `GET /api/simulation/match` - runs a simulation on a randomly generated matchup and returns the results
- `GET /api/simulation/match/schema` - gets the schema for a user submitted matchup request body
- `POST /api/simulation/match` - runs a simulation from a user submitted matchup returns the results
- `GET /*` - client routing handled by react-router
- static routing for the client directory

### Middleware

- cors middleware setup to only allow connections from `localhost`
- `bodyParser.json` for user submitted matchup data

### [Client](#client)

The server expects the client entry point to be `client/index.html`

A [simple react client](https://github.com/simonceddy/footy-client) can be cloned and built for the server. When built, move the resulting `client` folder from the client repo into this repo's root directory (the same directory that this readme file is located)

The client currently only includes pages for viewing generated matchups and leagues, with a basic simulation interface.

## Adding data to name generators

One of the funnest things this weird app does is generate random names and luckily for everyone it is easy to add to the data pool.

Data for name generation is located in the `resources` directory. Each type of data has its own CSV file:

- `firstNames.csv` - data for generating player first names
- `groundNames.csv` - data for generating stadium moniker e.g stadium, oval, ground, etc
- `locations.csv` - data for generating team and ground locations
- `nicknames.csv` - data for generating player nicknames
- `surnames.csv` - data for generating player surnames
- `teamNames.csv` - data for generating team monikers

League names are currently generated from nicknames or team names.

Stadium names are generated from either a given team's location, nickname or team name data, or a generated first name + surname. E.g. Ogdenville Oval, Gazza Stadium, or George Orwell Football Ground

CSV files make it very easy to add your own data. Just separate each new entry with a comma.

If the server is running when you modify a data CSV file you will have to restart the server for new data to be included.

Capitalisation is currently ignored.
