const { Undici } = require('./client')
const { spawn } = require('child_process')

test('buffers', async () => {
  const child = spawn('node', ['server.js'])
  const undici = new Undici('http://localhost:4005')
  const x = await undici.request('{}')
  console.log(x)
})
