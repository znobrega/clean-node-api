import { Router } from 'express'

export default (router: Router): void => {
  router.get('/hello')
  router.post('/signup', (req, res) => {
    res.json({ ok: 'succes' })
  })
}
