const getStream = require('get-stream')
const { Pool } = require('undici')

exports.Undici = class Undici {
  constructor(url, moreArgs) {
    this.pool = new Pool(url, {
      connections: 100,
      pipelining: 10,
      // requestTimeout: 0,
      // socketTimeout: 0,
      ...moreArgs,
    })
  }
  request(body, customHeaders) {
    return new Promise((resolve, reject) => {
      this.pool.request(
        {
          path: '/',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...customHeaders,
          },
          body,
        },
        async (err, result) => {
          if (err) {
            reject(err)
          } else {
            const { statusCode, headers, body } = result
            const data = JSON.parse(await getStream(body))
            resolve({ statusCode, headers, data })
          }
        },
      )
    })
  }
  status() {
    return new Promise((resolve, reject) => {
      this.pool.request(
        {
          path: '/',
          method: 'GET',
        },
        async (err, result) => {
          if (err) {
            reject(err)
          } else {
            const { statusCode, headers, body } = result
            const data = JSON.parse(await getStream(body))
            resolve({ statusCode, headers, data })
          }
        },
      )
    })
  }
  close() {
    if (!this.closed) {
      this.pool.close(() => {
        // ignore close error
      })
    }
    this.closed = true
  }
}
