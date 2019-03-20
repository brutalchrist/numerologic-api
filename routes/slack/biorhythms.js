const express = require('express');
const numerology = require('numerologic');
const dayjs = require('dayjs');
const debug = require('debug')('numerologic-api:server');

const router = express.Router();

router.post('/', function(req, res, next) {
  const currentDay = dayjs().format('DD');
  const date = dayjs(req.body.text)
    .format('DD.MM.YYYY');
  const bioRhythms = numerology(date).bioRhythms();

  if (debug.enabled) {
    console.table(bioRhythms);
  }

  const physicalTendency = 
    (bioRhythms.physical[Number(currentDay)+1] > bioRhythms.physical[currentDay]) 
    ? '👆'
    : '👇';

  const emotionalTendency = 
    (bioRhythms.emotional[Number(currentDay)+1] > bioRhythms.emotional[currentDay]) 
    ? '👆'
    : '👇';

  const intellectualTendency = 
    (bioRhythms.intellectual[Number(currentDay)+1] > bioRhythms.intellectual[currentDay]) 
    ? '👆'
    : '👇';

  const response = {
    response_type: 'in_channel',
    text: 'Tu _Bioritmo_ para la fecha `' + date + '` es:',
    attachments: [
      { 
        title: 'Físico',
        text: `${bioRhythms.physical[currentDay]} ${physicalTendency}`
      },
      {
        title: 'Emocional',
        text: `${bioRhythms.emotional[currentDay]} ${emotionalTendency}`
      },
      {
        title: 'Intelectual',
        text: `${bioRhythms.intellectual[currentDay]} ${intellectualTendency}`
      }
    ]
  };

  res.json(response);
});

module.exports = router;
