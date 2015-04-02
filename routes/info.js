var express = require('express');
var _ = require('lodash');
var validators = require('../helper/validators');
var router = express.Router();

router.get('/:project', function(req, res) {
  var project = req.params.project;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ project: project }));
});

router.put('/oli', function (req, res) {
	console.log(req);
	res.send("ha");
});	
router.post('/:project/:schema', function (req, res) {
  var isJson= req.accepts('application/json') === 'application/json';
  if (!isJson) {
  	res.status(404).json({code: 406, error: "Would expect application/json"});
  	return;
  }

  var project = req.params.project;
  if (!validators.isProject(project)) {
	res.status(404).json({code: 404, error: "Would expect a known project"});
	return;
  }
  
  var schema = validators.getBestSchema('post', project, req.params.schema);
 
 if (_.isNull(schema)) {
	res.status(404).json({code: 404, error: "Could not find a relevant schema"});
	return;
  }

  var id = req.query.id; 

if (_.isUndefined(id)) {
	res.status(404).json({code: 404, error: "Would expect an id"});
	return;
  }


  

  res.send("hi");
});


module.exports = router;
