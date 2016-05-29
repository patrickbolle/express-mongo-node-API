var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Superhero = mongoose.model('superheros');

//Get all superheros -- GET
router.get('/superheros', function(req, res) {
  Superhero.find(function(err, superheros){
    console.log(superheros)
    res.render(
      'api',
      {title : 'Superhero API', superheros : superheros}
    );
  });
});

//Get specific superhero -- GET
router.get('/superhero/:id', function(req, res) {
  var query = {"_id": req.params.id};
  Superhero.findOne(query, function(err, superhero){
    console.log(superhero)
    res.render(
      'superhero',
      {title : 'Superhero API - ' + superhero.name, superhero : superhero}
    );
  });
});

//Insert superhero -- POST
router.post('/superheros', function(req, res) {
  new Superhero({name : req.body.name})
  .save(function(err, superhero) {
    console.log(superhero)
    res.redirect('/api/superheros');
  });
});

//Update superhero -- PUT
router.put('/superhero/:id', function(req, res) {
  var query = {"_id": req.params.id};
  var update = {name : req.body.name};
  var options = {new: true};
  Superhero.findOneAndUpdate(query, update, options, function(err, superhero){
    console.log(superhero)
    res.render(
      'superhero',
      {title : 'Superhero API - ' + superhero.name, superhero : superhero}
    );
  });
});

//Delete superhero -- DELETE
router.delete('/superhero/:id', function(req, res) {
  var query = {"_id": req.params.id};
  Superhero.findOneAndRemove(query, function(err, superhero){
    console.log(superhero)
    res.redirect('/api/superheros');
  });
});

module.exports = router;
