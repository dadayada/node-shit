// @flow
import type { Stream } from '../types'

const StreamPersist = require('../persist')

const TIMEOUT = 5000

let id = 0

const timers: Map<number, TimeoutID> = new Map()

function create(): Stream {
  const stream = {
    id,
    created: new Date().toISOString(),
    state: 'created'
  }
  StreamPersist.save(stream)
  id++
  return stream
}

function deactivate(id: number) {
  const stream = StreamPersist.getById(id)
  if (stream && stream.state !== 'Finished' && stream.state !== 'Active') {
    stream.state = 'interrupted'
    StreamPersist.save(stream)
    timers.set(
      id,
      setTimeout(() => {
        if (timers.get(id)) {
          timers.delete(id)
          StreamPersist.save({ ...stream, state: 'finished' })
        }
      }, TIMEOUT)
    )
  }
}

function activate(id: number) {
  const stream = StreamPersist.getById(id)
  if (stream && stream.state !== 'Finished') {
    stream.state = 'active'
    StreamPersist.save(stream)
    if (stream.state === 'Interrupted') {
      timers.delete(id)
    }
  }
}

function getAllStreams() {
  return StreamPersist.getAll()
}

export {
  activate,
  getAllStreams,
  deactivate,
  create
}
