#! /usr/bin/env node

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async');
var Home = require('./models/home');

var mongoose = require('mongoose');
var mongoDB = userArgs[0]; //returns url
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise=global.Promise
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

console.log('----------------------------------------------')
var homes = [];

function homeCreate(home_name, summary, price, picture_url, address, cb) {
  var homedetail = {
    home_name: home_name,
    summary: summary,
    price: price,
    picture_url: picture_url,
    address: address,
  };

  var home = new Home(homedetail);

  home.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Author: ' + home);
    homes.push(home);
    cb(null, home);
  });
}


  async.series(
    [
      function (callback) {
        homeCreate(
          'Riberia Charming Duplex',
          'Fantastic duplex apartment with three bedrooms, located in the historic area of Porto, Ribeira (Cube) - UNESCO World Heritage Site. Centenary building fully rehabilitated, without losing their original character.',
          '80.00',
          'https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large',
          'Porto',
          callback
        );
      },
      function (callback) {
        homeCreate(
          'Modern Spacious 1 Bedroom Loft',
          'Prime location, amazing lighting and no annoying neighbours.  Good place to rent if you want a relaxing time in Montreal.',
          '50.00',
          'https://a0.muscache.com/im/pictures/9fa69ad8-c9be-45dd-966b-b8f59bdccb2b.jpg?aki_policy=large',
          'Montreal',
          callback
        );
      },
      function (callback) {
        homeCreate(
          'Horto flat with small garden',
          'One bedroom + sofa-bed in quiet and bucolic neighbourhood right next to the Botanical Garden. Small garden, outside shower, well equipped kitchen and bathroom with shower and tub. Easy for transport with many restaurants and basic facilities in the area.',
          '317.00',
          'https://a0.muscache.com/im/pictures/5b408b9e-45da-4808-be65-4edc1f29c453.jpg?aki_policy=large',
          'Rio De Janeiro',
          callback
        );
      },
      function (callback) {
        homeCreate(
          'New York City - Upper West Side Apt',
          'Quarto com vista para a Lagoa Rodrigo de Freitas, cartão postal do Rio de Janeiro. Linda Vista.  1 Quarto e 1 banheiro  Amplo, arejado, vaga na garagem. Prédio com piscina, sauna e playground.  Fácil acesso, próximo da praia e shoppings.',
          '135.00',
          'https://a0.muscache.com/im/pictures/15074036/a97119ed_original.jpg?aki_policy=large',
          'New York',
          callback
        );
      },
      function (callback) {
        homeCreate(
          'Apt Linda Vista Lagoa - Rio',
          'Quarto com vista para a Lagoa Rodrigo de Freitas, cartão postal do Rio de Janeiro. Linda Vista.  1 Quarto e 1 banheiro  Amplo, arejado, vaga na garagem. Prédio com piscina, sauna e playground.  Fácil acesso, próximo da praia e shoppings.',
          '701.00',
          'https://a0.muscache.com/im/pictures/59c516bd-c7c3-4dae-8625-aff5f55ece53.jpg?aki_policy=large',
          'Rio De Janeiro',
          callback
        );
      },
    ],
    function(err,results){
        if(err){
            console.log(err)
        }
        else{
            mongoose.connection.close();
        }
    }
  );

