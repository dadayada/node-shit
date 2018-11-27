// @flow
import type { Stream } from '../types'

const redis = require('redis')


const store = new Map/*::<number, Stream>*/()

exports.getById = function getById(id: number): ?Stream {
  return store.get(id)
}

exports.getAll = function getAll(): Stream[] {
  return Array.from(store.values())
}

exports.save = function save(stream: Stream): boolean {
  store.set(stream.id, { ...stream })
  return true
}

exports.deleteById = function deleteById(id: number) {
  return store.delete(id)
}
