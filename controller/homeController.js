const Home = require('../models/home');
const Image = require('../models/image');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

//multer config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads');
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname)
    );
  },
});

//init upload
const upload = multer({
  storage: storage,
}).single('image');

//controller functions

exports.index = function (req, res, next) {
  Home.find({}).exec(function (err, results) {
    if (err) {
      return next(err);
    }
    console.log(results.picture_url);
    res.render('index', { all_results: results });
  });
};

exports.home_create_get = function (req, res) {
  res.render('home_form');
};

exports.home_create_post = function (req, res, next) {
  upload(req, res, function (err) {
    if (err) throw err;
    var picture_path = req.file.path.substr(req.file.path.indexOf('uploads'));
    var home = new Home({
      home_name: req.body.hname,
      summary: req.body.summary,
      price: req.body.price,
      picture_url: picture_path,
      address: req.body.city,
    });
    home.save(function (err) {
      if (err) {
        return next(err);
      } else {
        res.redirect('/catalog');
      }
    });
  });
};

exports.home_delete_update_get = function (req, res) {
  Home.find().exec(function (err, results) {
    if (err) throw err;
    res.render('deleteandupdate', { results: results });
  });
};

exports.home_delete_get = function (req, res) {
  Home.findByIdAndRemove({ _id: req.params.id }).exec(function (err, results) {
    if (err) throw err;
    if (results.picture_url.startsWith('uploads')) {
      fs.unlink('./public/' + results.picture_url, (err) => {
        if (err) throw err;
        console.log('succesfully deleted image too');
      });
    }
    res.redirect('/catalog/home/delete_update');
  });
};

exports.home_update_get = function (req, res) {
  Home.findById(req.params.id).exec(function (err, results) {
    if (err) throw err;
    var home_name = results.home_name;
    var price = results.price;
    var address = results.address;
    var summary = results.summary;
    var picture_url = results.picture_url;
    var id = results._id;
    console.log(id);
    res.render('home_form', {
      home_name: home_name,
      price: price,
      address: address,
      summary: summary,
      picture_url: picture_url,
      id: id,
    });
  });
};

exports.home_update_post = function (req, res) {
  upload(req, res, function (err) {
    if (err) {
      res.send('there is a problem');
    } else {
      var update = new Home({
        _id: req.params.id,
        home_name: req.body.hname,
        summary: req.body.summary,
        price: req.body.price,
        picture_url:
          req.file === undefined
            ? req.body.picurl
            : req.file.path.substr(req.file.path.indexOf('uploads')),
        address: req.body.city,
      });
      if (req.file) {
        Home.findById(req.params.id).exec(function (err, results) {
          if (err) throw err;
          fs.unlink('./public/' + results.picture_url, (err) => {
            if (err) throw err;
            console.log('successfully updated image');
          });
        });
      }
      Home.findByIdAndUpdate(req.params.id, update).exec(function (
        err,
        results
      ) {
        if (err) throw err;
        res.redirect('/catalog/home/delete_update');
      });
    }
  });
};
