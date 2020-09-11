import { Router } from 'express'
import { adaptRout } from '../adapters/express-route-adapter'
import { makeSignupController } from '../factories/signup'

export default (router: Router): void => {
  router.get('/hello')
  router.post('/signup', adaptRout(makeSignupController()))
}
