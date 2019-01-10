const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line

var path = require('path')

// Conditions list
var conditions = require('./data/conditions/source/conditions-canonical-list.json')
var conditionsList = [''];

// Convert map to array of objects
for (const condition of conditions) {
  conditionsList.push({
     text: condition, 
     value: condition.toLowerCase().split(" ").join("-")
  })
}

// Data sources
router.all('/data/:data/source/:source', (req, res) => {
  const { data, source } = req.params
  res.json(require(`./data/${data}/source/${source}`))
})

// Page routing
router.get('*', function (req, res, next) {
  res.locals.conditions = conditionsList;

  if (req.params[0].substr(-1) == '/') res.locals.path = req.params[0].slice(0,-1).substr(1);
  else res.locals.path = path.dirname(req.params[0]).substr(1);
  next();
})

module.exports = router
