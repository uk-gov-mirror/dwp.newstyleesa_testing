const express = require('express')
const router = express.Router()
const moment = require('moment');

// Add your routes here - above the module.exports line

var path = require('path')

// Data sources
router.all('/data/:data/source/:source', (req, res) => {
  const { data, source } = req.params
  res.json(require(`./data/${data}/source/${source}`))
})

router.get('/*/claimdate', function (req, res, next) {
  console.log('hello')
  var date = req.session.data['ssp-dob-year'] + '-' +req.session.data['ssp-dob-month'] + '-' + req.session.data['ssp-dob-day'];
  date = moment(date, 'YYYY-MM-DD');
  date.add(1, 'days');
  res.locals.statDatePlusOne = date.format('DD/MM/YYYY');
  console.log(date)
  next();
})

// Page routing
router.get('*', function (req, res, next) {
  if (req.params[0].substr(-1) == '/') res.locals.path = req.params[0].slice(0,-1).substr(1);
  else res.locals.path = path.dirname(req.params[0]).substr(1);
  next();
})

module.exports = router
