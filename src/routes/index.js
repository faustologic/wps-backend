import express from 'express'

const router = express.Router()
router.get('/', (req, res) => {
  res.send('Api is OK')
})
export default router
