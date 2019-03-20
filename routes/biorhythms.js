const express = require('express');
const numerology = require('numerologic');
const dayjs = require('dayjs');
const debug = require('debug')('numerologic-api:server');

const router = express.Router();

router.post('/', function(req, res, next) {
  const date = dayjs(`${req.body.year}-${req.body.month}-${req.body.day}`)
  .format('DD.MM.YYYY');
  const bioRhythms = numerology(date).bioRhythms();

  if (debug.enabled) {
    console.table(bioRhythms);
  }

  res.json(bioRhythms);
});

module.exports = router;
