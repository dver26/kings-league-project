import { Hono } from 'hono'
import { serveStatic } from 'hono/serve-static.module'
import leaderboard from '../db/leaderboard.json'
import presidents from '../db/presidents.json'
import teams from '../db/teams.json'

const app = new Hono()

app.get('/', (ctx) =>
  ctx.json([
    {
      endpoint: '/leaderboard',
      description: 'Return the Kings League leaderboard'
    },
    {
      endpoint: '/teams',
      description: 'Return the Kings League teams'
    },
    {
      endpoint: '/presidents',
      description: 'Return the Kings League presidents'
    }
  ])
)

app.get('/leaderboard', (ctx) => {
  return ctx.json(leaderboard)
})

app.get('/presidents', (ctx) => {
  return ctx.json(presidents)
})

app.get('/presidents/:id', (ctx) => {
  const foundPresident = presidents.find(
    (president) => president.id === ctx.req.param('id')
  )

  return foundPresident
    ? ctx.json(foundPresident)
    : ctx.json({ message: 'President not found' }, 404)
})

app.get('/teams', (ctx) => {
  return ctx.json(teams)
})

app.get('/teams/:id', (ctx) => {
  const id = ctx.req.param('id')
  const foundTeam = teams.find((team) => team.id === id)

  return foundTeam
    ? ctx.json(foundTeam)
    : ctx.json({ message: 'Team not found' }, 404)
})

app.get('/static/*', serveStatic({ root: './' }))

export default app
