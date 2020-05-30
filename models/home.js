var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var HomeSchema = new Schema(
  {
    home_name: {type: String, required: true},
    summary: {type: String, required: true},
    price: {type: String, required: true},
    picture_url: {type: String, required: true},
    address: {type: String, required:true}
  }
);

// Virtual for book's URL
// BookSchema
// .virtual('url')
// .get(function () {
//   return '/catalog/book/' + this._id;
// });

//Export model
module.exports = mongoose.model('Home', HomeSchema);