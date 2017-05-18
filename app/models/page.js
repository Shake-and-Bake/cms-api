'use strict'

const mongoose = require('mongoose')

const pageSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: 1,
    maxlength: 100,
    required: true
  },
  body: {
    type: String,
    minlength: 1,
    maxlength: 500,
    required: true
  },
  footer: {
    type: String,
    minlength: 1,
    maxlength: 100,
    required: true
  },
  template: {
    type: String,
    enum: ['defaultTemplate', 'coolTemplate', 'fancyTemplate'],
    required: true
  },
  _owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true,
  // do we even need this??
  toJSON: {
    virtuals: true,
    transform: function (doc, ret, options) {
      const userId = (options.user && options.user._id) || false
      ret.editable = userId && userId.equals(doc._owner)
      return ret
    }
  }
})

// NEED THIS??
// pageSchema.virtual('length').get(function length () {
//   return this.text.length
// })

const Page = mongoose.model('Page', pageSchema)

module.exports = Page
