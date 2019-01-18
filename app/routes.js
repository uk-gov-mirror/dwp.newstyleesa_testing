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


// Adding the moment plug in for Claim Date screen
router.get('/*/claimdate', function (req, res, next) {
  var ssp = req.session.data['ssp-dob-year'] + '-' +req.session.data['ssp-dob-month'] + '-' + req.session.data['ssp-dob-day'];
  ssp = moment(ssp, 'YYYY-MM-DD');
  ssp.add(1, 'days');
  
  var recent = req.session.data['ssp-recent-dob-year'] + '-' +req.session.data['ssp-recent-dob-month'] + '-' + req.session.data['ssp-recent-dob-day'];
  recent = moment(recent, 'YYYY-MM-DD');
  recent.add(1, 'days');
  
  var last = req.session.data['last-dob-year'] + '-' +req.session.data['last-dob-month'] + '-' + req.session.data['last-dob-day'];
  last = moment(last, 'YYYY-MM-DD');
  last.add(1, 'days');
  
  if(req.session.data.work == 'employed') {
    if(req.session.data.offSick == 'yes') {

      if(req.session.data['statutory-pay'] == 'yes') {
        res.locals.sspDatePlusOne = ssp.format('DD/MM/YYYY');
      }

      if(req.session.data['statutory-pay-recent'] == 'yes') {
        res.locals.lastWorkDatePlusOne = last.format('DD/MM/YYYY');
      }
    } else { // still working

      if(req.session.data['statutory-pay-recent'] == 'yes') {
        res.locals.sspRecentDatePlusOne = recent.format('DD/MM/YYYY');
      }
    }
  } else { // not working
    if(req.session.data['statutory-pay-recent'] == 'yes') {
      res.locals.sspRecentDatePlusOne = recent.format('DD/MM/YYYY');
    }
  }

  next();
})

// Page routing
router.get('*', function (req, res, next) {
  if (req.params[0].substr(-1) == '/') res.locals.path = req.params[0].slice(0,-1).substr(1);
  else res.locals.path = path.dirname(req.params[0]).substr(1);
  next();
})

module.exports = router
