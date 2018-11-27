// @flow

const presets = [
  '@babel/preset-flow',
  [
    '@babel/preset-env',
    {
      loose: true,
      modules: 'commonjs',
      shippedProposals: true,
      targets: {
        node: '10'
      }
    }
  ]
]

const sourceMaps = true

module.exports = { presets }
