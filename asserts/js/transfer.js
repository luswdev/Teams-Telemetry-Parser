const tags = require('./tags.js')

function getTagVal(_tag, _payload) {
  let res, next
  switch (tags[_tag - 1]) {
    case 'Current Firmware (endpoint)':
    case 'Endpoint Device Model ID':
    case 'Device Serial Number (endpoint)':
    case 'Error message':
      {
        res = String.fromCharCode.apply(null, _payload)
        next = []
        break;
      }
    case 'Current Firmware (dongle/base)':
    case 'Device Serial Number (dongle/base)':
    case 'User modified SideTone Level':
    case 'Button press info':
    case 'People count':
    case 'Local conference count':
      {
        res = `0x${_payload[0].toString(16)}`
        next = _payload.slice(1)
        break;
      }
    case 'Don to answer setting':
    case 'Hardmute/Mute Lock':
    case 'Headset worn':
      if (_payload[0] === 1) {
        res = 'On'
      } else if (_payload[0] === 0) {
        res = 'Off'
      } else {
        res = 'Unknown'
      }
      next = _payload.slice(1)
      break;
    case 'Audio codec used':
      {
        if (_payload[0] == 1) {
          res = 'NarrowBand'
        } else if (_payload[0] == 2) {
          res = 'WideBand'
        } else {
          res = 'Unknown'
        }
        next = _payload.slice(1)
        break;
      }
    case 'DSP effects enabled by headset':
      {
        let dsp = []
        let dsp_en = [
          ['', '', '', '',
            '', '', '', '',],
          ['Dynamic Range Compression', 'Other', '', '',
            '', '', '', '',],
          ['Bass Boost', 'Virtual Surround', 'Virtual Headphones', 'Speaker Fill',
            'Room Correction', 'Bass Management', 'Environmental Effects', 'Speaker Compensation',],
          ['Acoustic Echo Cancellation', 'Automatic Gain Control', 'Noise Suppression', 'Speaker Protection',
            'Beam Forming', 'Constant Tone Removal', 'Equalizer', 'Loudness Equalizer',],
        ]

        for (let i = 3; i >= 0; --i) {
          for (let j = 0; j < 8; ++j) {
            if (dsp_en === '') {
              continue
            } else if (_payload[i] & (0x1 << j)) {
              dsp.push(dsp_en[i][j])
            }
          }
        }

        res = dsp.join(' / ')
        next = _payload.slice(4)
        break;
      }
    case 'Battery Level':
      {
        if (_payload[0] == 1) {
          res = 'Off'
        } else if (_payload[0] == 2) {
          res = 'Critically Low'
        } else if (_payload[0] == 3) {
          res = 'Med'
        } else if (_payload[0] == 4) {
          res = 'Hi'
        } else {
          res = 'Unknown'
        }
        next = _payload.slice(1)
        break;
      }
    case 'Device Ready':
    case 'Connected wireless device change':
      {
        if (_payload[0] === 1) {
          res = 'Yes'
        } else if (_payload[0] === 0) {
          res = 'No'
        } else {
          res = 'Unknown'
        }
        next = _payload.slice(1)
        break;
      }
    case 'Radio Link Quality':
      {
        if (_payload[0] === 1) {
          res = 'Off'
        } else if (_payload[0] === 2) {
          res = 'Low'
        } else if (_payload[0] === 3) {
          res = 'Hi'
        } else {
          res = 'Unknown'
        }
        next = _payload.slice(1)
        break;
      }
    default:
      {
        res = ''
        next = _payload
        break;
      }
  }

  console.log('parse tag:', _tag, 'val:', res, 'next:', next)
  return { str: res, next: next }
}

module.exports = (_logs) => {
  let res = Array.apply(null, Array(tags.length)).map(() => '-')
  for (let log of _logs) {
    let payload = log.mPayload
    console.log('parse row:', payload)
    while (payload.length > 0) {
      const tag = payload[0]
      if (tag > tags.length) {
        payload = payload.slice(1)
        console.log('unknown tag:', tag)
        continue
      }

      if (payload.length <= 1) {
        console.log('payload too short:', payload.length)
        break
      }

      const val = getTagVal(tag, payload.slice(1))
      res[tag - 1] = val.str

      payload = val.next
    }
  }

  return res
}
