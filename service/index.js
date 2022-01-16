const express = require('express')

const cors = require('cors')

const app = exoress()
app.use(cors())

const port = process.env.PORT || 4000

app.listen(port, () =>
  console.log(`Services listening at http://localhost:${port}`)
)
