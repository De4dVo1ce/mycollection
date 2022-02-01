console.log(Date())

const express = require('express')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())

const databases = require('./src/utils/loadDatabases')

const port = process.env.PORT || 4000

app.listen(port, () => console.log(`Service listening at PORT: ${port}`))
