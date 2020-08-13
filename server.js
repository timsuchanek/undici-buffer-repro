const http = require('http')

const server = http.createServer((req, res) => {
  res.end('{}')
  setTimeout(() => {
    process.exit(1)
  }, 1000)
})

server.listen(4005)

console.log('Listening on 4005')
