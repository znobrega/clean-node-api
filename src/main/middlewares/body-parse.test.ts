import request from 'supertest'
import app from '../config/app'

describe('Body Parser Middlwerare', () => {
  test('Should parser body as json', async () => {
    app.post('/test', (req, res) => {
      res.send(req.body)
    })

    await request(app)
      .post('/test')
      .send({ name: 'Carl' })
      .expect({ name: 'Carl' })
  })
})
