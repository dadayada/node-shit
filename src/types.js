// @flow

export type Stream = {
  id: number,
  created: string,
  state: 'created' | 'active' | 'interrupted' | 'finished'
}
