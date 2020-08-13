# undici & jest reproduction

## Reproduction

```bash
npm install
npm run jest
```

### Error
```
  ● buffers

    assert(received)

    Expected value to be equal to:
      true
    Received:
      false

      at write (node_modules/undici/lib/client.js:966:5)
      at resume (node_modules/undici/lib/client.js:886:7)
      at Socket.onSocketConnect (node_modules/undici/lib/client.js:616:3)
```
