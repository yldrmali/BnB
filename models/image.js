var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var imageSchema = new Schema({
  img: {
    data: Buffer,
    contentType: String,
  },
});

// Virtual for book's URL
// BookSchema
// .virtual('url')
// .get(function () {
//   return '/catalog/book/' + this._id;
// });

//Export model
module.exports = mongoose.model('Image', imageSchema);