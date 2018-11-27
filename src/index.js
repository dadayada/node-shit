// @flow
const Koa = require('koa')
const Router = require('koa-router')
const winston = require('winston')
import { activate, getAllStreams, create, deactivate } from './services/stream'

const app = new Koa()
const router = new Router()

router.get('/all', (ctx, next) => {
   ctx.response.body = JSON.stringify(getAllStreams())
    next()
})

router.patch('/deactivate/:id', (ctx, next) =>{
  deactivate(Number(ctx.params.id))
  ctx.response.status = 200
  next()
})

router.post('/', (ctx, next) => {
  ctx.response.body = JSON.stringify(create())
  next()
})

app
  .use(router.routes())

app.listen(3000)
