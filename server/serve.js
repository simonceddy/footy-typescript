const path = require('path')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const apiRouter = require('./api')

const port = 18727

const app = express()

app.use(cors({
  origin: /^http\:\/\/localhost/
}))
app.use(bodyParser.json({ limit: '50mb' }))

app.use('/api', apiRouter)

app.use(express.static('./client'))

app.get('*', (_req, res) => res.sendFile(path.resolve('client', 'index.html')));

app.listen(port, () => { console.log(`http://localhost:${port}`) })
