import { MongoHelper } from '../infra/db/mongodb/helpers/mogo-helper'
import env from './config/env'

MongoHelper.connect(env.mongoUrl)
  .then(async () => {
    const app = (await import ('./config/app')).default
    app.listen(env.port, () => {
      console.log('SERVER RUNNING IS RUNNNING ON PORT ', env.port)
    })
  })
  .catch(console.error)
