import asyncWrap from '../utils/asyncWrap'
import {
  insert as subcriptionsInsert,
  find as subcriptionsFind,
  findAll as subcriptionsFindAll,
  patch as subcriptionsPatch,
  deleteOne as subcriptionsDelete,
  restore as subcriptionsRestore,
} from '../services/subcriptions'
const insert = asyncWrap(async (req, res) => {
  const subcription = await subcriptionsInsert(req.body)
  res.json(subcription)
})
const findSubcriptions = asyncWrap(async (req, res) => {
  if (req.params.id) {
    const subcription = await subcriptionsFind(req.params.id, {
      ...req.query,
      withDeleted: req.query.withDeleted === 'true' ? true : false,
      onlyDeleted: req.query.onlyDeleted === 'true' ? true : false,
    })
    res.json(subcription)
  } else {
    const subcriptions = await subcriptionsFindAll({
      ...req.query,
      withDeleted: req.query.withDeleted === 'true' ? true : false,
      onlyDeleted: req.query.onlyDeleted === 'true' ? true : false,
      all: req.query.all === 'true' ? true : false,
    })
    res.json(subcriptions)
  }
})

const patch = asyncWrap(async (req, res) => {
  const subcription = await subcriptionsPatch(req.params.id, req.body)
  return res.json(subcription)
})

const deleteOne = asyncWrap(async (req, res) => {
  const subcription = await subcriptionsDelete(req.params.id, {
    hardDelete: req.query.hardDelete === 'true' ? true : false,
  })
  return res.json(subcription)
})

const restore = asyncWrap(async (req, res) => {
  const subcription = await subcriptionsRestore(req.params.id)
  return res.json(subcription)
})
export default { insert, findSubcriptions, patch, deleteOne, restore }
