// Express Setup
const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'));

// Knex Setup
const env = process.env.NODE_ENV || 'development';
const config = require('./knexfile')[env];  
const knex = require('knex')(config);

// bcrypt setup
let bcrypt = require('bcrypt');
const saltRounds = 10;

app.listen(3000, () => console.log('Server listening on port 3000!'));


//Endpoint for user login
app.post('/api/login', (req, res) => {
  if (!req.body.email || !req.body.password)
    return res.status(400).send();
  knex('users').where('email',req.body.email).first().then(user => {
    if (user === undefined) {
      res.status(403).send("Invalid credentials");
      throw new Error('abort');
    }
    return [bcrypt.compare(req.body.password, user.hash),user];
  }).spread((result,user) => {
    if (result)
      res.status(200).json({user:{username:user.username,name:user.name,id:user.id}});
    else
      res.status(403).send("Invalid credentials");
    return;
  }).catch(error => {
    if (error.message !== 'abort') {
      console.log(error);
      res.status(500).json({ error });
    }
  });
});

//Endpoint for user registration
app.post('/api/users', (req, res) => {
  if (!req.body.email || !req.body.password || !req.body.username || !req.body.name)
    return res.status(400).send();
  knex('users').where('email',req.body.email).first().then(user => {
    if (user !== undefined) {
      res.status(403).send("Email address already exists");
      throw new Error('abort');
    }
    return knex('users').where('username',req.body.username).first();
  }).then(user => {
    if (user !== undefined) {
      res.status(409).send("User name already exists");
      throw new Error('abort');
    }
    return bcrypt.hash(req.body.password, saltRounds);
  }).then(hash => {
    return knex('users').insert({email: req.body.email, hash: hash, username:req.body.username,
				 name:req.body.name});
  }).then(ids => {
    return knex('users').where('id',ids[0]).first().select('username','name','id');
  }).then(user => {
    res.status(200).json({user:user});
    return;
  }).catch(error => {
    if (error.message !== 'abort') {
      console.log(error);
      res.status(500).json({ error });
    }
  });
});

//Endpoint for getting user decks
app.get('/api/users/:id/decks', (req, res) => {
  let id = parseInt(req.params.id);
  knex('users').join('decks','users.id','decks.user_id')
    .where('users.id',id)
    .orderBy('title','desc')
    .select('title','username','name').then(decks => {
      res.status(200).json({decks:decks});
    }).catch(error => {
      res.status(500).json({ error });
    });
});

//Endpoint for saving a deck
app.post('/api/users/:id/decks', (req, res) => {
  let id = parseInt(req.params.id);
  knex('users').where('id',id).first().then(user => {
    return knex('decks').insert({user_id: id, title:req.body.title, cards:req.body.cards});
  }).then(ids => {
    return knex('decks').where('id',ids[0]).first();
  }).then(tweet => {
    res.status(200).json({decks:decks});
    return;
  }).catch(error => {
    console.log(error);
    res.status(500).json({ error });
  });
});