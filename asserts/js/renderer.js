const fs = require('fs')
const path = require('path')
const { createApp } = require('vue')
const tags = require('./asserts/js/tags.js')
const parser = require('./asserts/js/parser.js')
const transfer = require('./asserts/js/transfer.js')
const { shell } = require('electron')

const app = {
  data() {
    return {
      'tags': tags,
      'logs': [],
      'filePath': '',
    }
  },
  methods: {
    uploadLog: function (e) {
      this.logs = Array.apply(null, Array(this.tags.length)).map(() => { })

      const files = e.target.files || e.dataTransfer.files
      this.filePath = files[0].path
      this.uploadLogHandler(this.filePath)
    },
    uploadLogHandler: function (_path) {
      const fileContent = fs.readFileSync(_path, { encoding: 'utf8', flag: 'r' })
      const logContent = parser(fileContent)
      this.logs = transfer(logContent)

      this.$nextTick(() => {
        for (let ref of this.$refs.tags) {
          ref.style.height = (ref.scrollHeight) + 'px'
        }
      }) // wait for re-rendered done
    },
    saveRes: function () {
      this.$refs.savePath.click()
    },
    saveResHandler: function (e) {
      const folder = e.target.files || e.dataTransfer.files
      const folderPath = path.dirname(folder[0].path)
      const savePath = path.join(folderPath, `${path.parse(this.filePath).name}_${Date.now().toString()}_parsed.json`)
      let resJson = {}

      for (let i = 0; i < this.logs.length; ++i) {
        resJson[tags[i]] = this.logs[i]
      }

      const rawJsonRes = JSON.stringify(resJson, null, 2)
      fs.writeFileSync(savePath, rawJsonRes, { encoding: 'utf8', flag: 'w' })

      new Notification('Save Successfully', {
        icon: path.join(__dirname, './asserts/img/favicon.ico'),
        body: `Result saved to ${savePath}`
      }).onclick = () => {
        shell.openPath(savePath)
      }
    },
    reloadLog: function () {
      this.uploadLogHandler(this.filePath)
    },
    clearRes: function () {
      this.$refs.logFile.value = null;
      this.filePath = ''
    },
    keyboardHandler: function (e) {
      if (e.key === 'o' && e.ctrlKey) {
        this.$refs.logFile.click()
      }

      if (this.filePath === '') {
        return
      }

      if (e.key === 's' && e.ctrlKey) {
        this.saveRes()
      } else if (e.key === 'n' && e.ctrlKey) {
        this.clearRes()
      } else if (e.key === 'F5') {
        this.reloadLog()
      }
    },
  },
  created() {
    window.addEventListener('keydown', this.keyboardHandler)
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.keyboardHandler)
  },
  mounted: function () {
    this.logs = Array.apply(null, Array(this.tags.length)).map(() => { })
  },
}

createApp(app).mount('#app')
