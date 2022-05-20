import express from 'express'
import cors from 'cors'

import { loadDatastores } from './src/database/loadDatabases'
import { startAccessManaging } from './src/logic/auth/accessManaging'
import { router as authRouter } from './src/api/authentication'
import { router as collectionsRouter } from './src/api/collections'
import { router as sharedRouter } from './src/api/shared'
import { router as userRouter } from './src/api/users'

console.log(new Date())

loadDatastores()
startAccessManaging()

const app = express()
app.use(express.json())
app.use(cors())

app.use(`/auth`, authRouter)
app.use(`/collections`, collectionsRouter)
app.use(`/shared`, sharedRouter)
app.use(`/users`, userRouter)

const port = process.env.PORT || 4000

app.listen(port, () => console.log(`Service listening at PORT: ${port}`))
