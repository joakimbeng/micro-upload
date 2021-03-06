'use strict'

const fileUpload = require('express-fileupload')

exports.upload = function upload (opts, fn) {
  if (!fn) {
    fn = opts
    opts = {}
  }

  const handler = fileUpload(opts)

  return (req, res) => {
    return new Promise(resolve => handler(req, res, resolve))
      .then(() => fn(req, res))
  }
}

exports.move = function move (src, dst) {
  return new Promise((resolve, reject) => {
    if (!src || typeof src.mv !== 'function') {
      reject(new TypeError('First argument must be an upload file object'))
    }

    src.mv(dst, err => {
      if (err) return reject(err)

      resolve()
    })
  })
}
