const package = require('../package.json')
const path = require('path')
const fs = require('fs')

module.exports = {
  packagerConfig: {
    icon: './asserts/img/favicon',
    executableName: package.name
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        setupIcon: './asserts/img/favicon.ico'
      },
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin', 'linux', 'win32'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {},
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {},
    },
    {
      name: '@electron-forge/maker-dmg',
      config: {
        format: 'ULFO'
      }
    },
  ],
  hooks: {
    postMake: (forgeConfig, makeResults) => {
      for (let res of makeResults) {
        if (res.platform !== 'win32') {
          continue
        }

        for (let file of res.artifacts) {
          if (file.indexOf('.exe') !== -1) {
            const outFolder = path.dirname(file)
            const exeFile = `${outFolder}/${package.name}-${package.version}-${res.arch}.exe`
            fs.renameSync(file, exeFile)
          }
        }
      }
    }
  }
}
