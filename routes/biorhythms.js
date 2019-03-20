const express = require('express');
const numerology = require('numerologic');
const dayjs = require('dayjs');

const router = express.Router();

router.post('/', function(req, res, next) {
  const date = dayjs(`${req.body.year}-${req.body.month}-${req.body.day}`)
  .format('DD.MM.YYYY');
  const bioRhythms = numerology(date).bioRhythms();

  res.json(bioRhythms);
});

module.exports = router;
