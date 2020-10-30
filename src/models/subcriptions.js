import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
import mongooseDelete from 'mongoose-delete'
import uniqueValidator from 'mongoose-unique-validator'
import { generateSubcriptionsSchema } from '../schemas/subcriptions'

const subcriptionsModel = mongoose.model(
  'Subcriptions',
  generateSubcriptionsSchema(mongoose, {
    mongoosePaginate,
    mongooseDelete,
    uniqueValidator,
  }),
)

export { subcriptionsModel }
