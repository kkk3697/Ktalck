module.exports = {
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
      config.resolve.alias['pages'] = path.join(__dirname, 'src/pages')
      return config
    },
  }
  