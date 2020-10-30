import pick from 'lodash/pick'
import omit from 'lodash/omit'

import { subcriptionsModel } from '../models/subcriptions'
import AplicationError from '../utils/aplicationError'

const insert = async (subcriptions) => {
  return new subcriptionsModel(subcriptions).save()
}
const find = async (
  id,
  { onlyDeleted = false, withDeleted = false, ...criteria },
) => {
  let subcription
  if (withDeleted) {
    subcription = subcriptionsModel.findOneWithDeleted({
      _id: id,
      ...pick(criteria, subcriptionsModel.getAllowedProperties()),
    })
  } else if (onlyDeleted) {
    subcription = subcriptionsModel.findOneDeleted({
      _id: id,
      ...pick(criteria, subcriptionsModel.getAllowedProperties()),
    })
  } else {
    subcription = subcriptionsModel.findOne({
      _id: id,
      ...pick(criteria, subcriptionsModel.getAllowedProperties()),
    })
  }
  if ((await subcription) === null) {
    throw new AplicationError(Error('Subcription not found'), 404)
  }
  return subcription
}
const findAll = async ({
  withDeleted = false,
  onlyDeleted = false,
  offset = 0,
  limit = 10,
  sort = 'createdAt _id',
  all = false,
  ...criteria
} = {}) => {
  return await subcriptionsModel.paginate(
    {
      ...pick(criteria, subcriptionsModel.getAllowedProperties()),
    },
    {
      offset,
      limit: all ? 99999999 : limit,
      sort,
      customFind: withDeleted
        ? 'findWithDeleted'
        : onlyDeleted
        ? 'findDeleted'
        : 'find',
      customCount: withDeleted
        ? 'countDocumentsWithDeleted'
        : onlyDeleted
        ? 'countDocumentsDeleted'
        : 'countDocuments',
    },
  )
}

const patch = async (id, fields = {}) => {
  const subcription = await subcriptionsModel.findOneAndUpdate(
    { _id: id },
    omit(fields, ['_id']),
    {
      new: true,
    },
  )
  if ((await subcription) === null) {
    throw new AplicationError(Error('Subcription not found'), 404)
  }
  return subcription
}

const deleteOne = async (id, { hardDelete = false } = {}) => {
  const document = await find(id, { withDeleted: true })
  let response = null
  if (document) {
    if (hardDelete) {
      response = document.remove()
    } else {
      response = document.delete()
    }
  } else {
    throw new AplicationError(Error('Subcription not found'), 404)
  }
  return response
}

const restore = async (id) => {
  const document = await find(id, { onlyDeleted: true })
  let response = null
  if (document) {
    response = await document.restore()
  } else {
    throw new AplicationError(Error('Subcription not found'), 404)
  }
  return response
}

export { insert, find, findAll, patch, deleteOne, restore }
