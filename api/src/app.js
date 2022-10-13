const express = require('express');
const cors = require('cors');
const app = express();

const {
  getAllUsers,
  postUsers,
  individualUser,
  postWeaponUser,
  deleteUser,
  updateUser,
  updateWeaponUser,
  allWeapons,
  deleteWeaponUser,
  onlyWeaponUserTable,
  getAllSchedule,
  getScheduleByDate,
  getAllposition,
  searchUsers,
  patchSchedule,
  deleteScheduleById,
  patchPosition,
} = require('./controller.js');

app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    // credentials: true
  })
);
app.use(express.json());

// const env = process.env.NODE_ENV || 'development'
// const config = require('../knexfile')[env]
// const knex = require('knex')(config)

app.get('/', (request, response) => {
  response.set('Access-Control-Allow-Origin', '*');
  response.status(200).send('Welcome to the API');
});

app.get('/schedule', (request, response) => {
  getAllSchedule()
    .then(data => response.status(200).send(data))
    .catch(err => response.status(500).send(err));
});

app.post('/schedule/date', (req, res) => {
  console.log('recieved schedule date req', req.body);
  getScheduleByDate(req.body)
    .then(data => res.status(200).send(data))
    .catch(err => res.status(500).send(err));
});

app.patch('/schedule/', (req, res) => {
  console.log('recieved schedule patch', req.body);
  patchSchedule(req.body)
    .then(data => res.status(200).send(data))
    .catch(err => res.status(500).send(err));
});

app.delete('/schedule/:id', (req, res) => {
  let { id } = req.params;
  console.log('recieved schedule patch', req.body);
  deleteScheduleById(id)
    .then(data => res.status(200).send(data))
    .catch(err => res.status(500).send(err));
});

app.get('/users', (request, response) => {
  getAllUsers()
    .then(data => response.status(200).send(data))
    .catch(err => response.status(500).send(err));
});

app.get('/usersearch', (request, response) => {
  getAllUsers()
    .then(data => response.status(200).send(data))
    .catch(err => response.status(500).send(err));
});

app.get('/usersearch/:search', (request, response) => {
  searchUsers(request.params.search)
    .then(data => response.status(200).send(data))
    .catch(err => response.status(500).send(err));
});

app.get('/users/:id', (req, res) => {
  let { id } = req.params;
  individualUser(id)
    .then(data => res.status(200).send(data))
    .catch(err => res.status(500).send(err));
});

app.get('/allweapons', (req, res) => {
  allWeapons()
    .then(data => res.status(200).send(data))
    .catch(err => res.status(500).send(err));
});

app.get('/onlyweaponusertable', (req, res) => {
  onlyWeaponUserTable()
    .then(data => res.status(200).send(data))
    .catch(err => res.status(500).send(err));
});

app.get('/position', (req, res) => {
  getAllposition()
    .then(data => res.status(200).send(data))
    .catch(err => res.status(500).send(err));
});

app.patch('/position/:id', (req, res) => {
  console.log('patching position');
  patchPosition(req)
    .then(data => res.status(200).send(data))
    .catch(err => res.status(500).send(err));
});

app.post('/postusers', (req, res) => {
  postUsers(req.body)
    .then(() => res.send({ message: 'We have posted a user.' }))
    .catch(err => res.status(500).send(console.log(err)));
});

app.post('/postweaponuser', (req, res) => {
  postWeaponUser(req.body)
    .then(() => res.send({ message: 'We have posted a weapon to a user.' }))
    .catch(err => res.status(500).send(console.log(err)));
});

app.patch('/updateuser/:id', (req, res) => {
  updateUser(req)
    .then(() => res.send({ message: 'We have updated a user.' }))
    .catch(err => res.status(500).send(console.log(err)));
});

app.patch('/updateweaponuser/:id', (req, res) => {
  updateWeaponUser(req)
    .then(() => res.send({ message: 'We have updated a weapon to a user.' }))
    .catch(err => res.status(500).send(console.log(err)));
});

app.delete('/deleteuser/:id', (req, res) => {
  deleteUser(req.params.id)
    .then(() => res.send({ message: 'We have deleted a user.' }))
    .catch(err => res.status(500).send(console.log(err)));
});

app.delete('/deleteweaponuser/:id', (req, res) => {
  deleteWeaponUser(req.params.id)
    .then(() => res.send({ message: 'We have deleted a weapon from a user.' }))
    .catch(err => res.status(500).send(console.log(err)));
});

module.exports = app;
