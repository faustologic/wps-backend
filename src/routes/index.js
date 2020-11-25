import express from 'express'
import Subcriptions from '../controllers/subcriptions.js'

const router = express.Router()
router.get('/', (req, res) => {
  res.send('Api is OK')
})
router.get('/subcriptions/csv', Subcriptions.getCsv)
router.get('/subcriptions/:id?', Subcriptions.findSubcriptions)

router.post('/subcriptions', Subcriptions.insert)
router.patch('/subcriptions/:id/restore', Subcriptions.restore)
router.patch('/subcriptions/:id', Subcriptions.patch)
router.delete('/subcriptions/:id', Subcriptions.deleteOne)

export default router
