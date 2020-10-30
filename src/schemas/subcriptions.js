const generateSubcriptionsSchema = (
  mongoose,
  {
    uniqueValidator = () => {},
    mongooseDelete = () => {},
    mongoosePaginate = () => {},
  } = {},
) => {
  const subcriptionsSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
  })
  subcriptionsSchema.plugin(uniqueValidator)
  subcriptionsSchema.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: ['find', 'findOne', 'findOneAndUpdate'],
  })
  subcriptionsSchema.plugin(mongoosePaginate)
  subcriptionsSchema.statics.getAllowedProperties = function () {
    return Object.keys(this.schema.paths)
  }
  return subcriptionsSchema
}
export { generateSubcriptionsSchema }
