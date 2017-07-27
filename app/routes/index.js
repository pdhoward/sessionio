'use strict';

//////////////////////////////////////////////////////
////////      xchg authorization and routes   ///////
////////////////////////////////////////////////////

const express =			require('express')
const cors =				require('cors')
const router = 			express.Router()
const passport =		require('passport')

let User = require('../models/user');
let Room = require('../models/room');

// TEST
router.post('/api/sms', function(req, res, next) {

	console.log("HELLO FROM EXCHANGE SERVER - SENSED SMS")

	const token = req.get('Authorization')
	if (token) {
	    req.token = token
	//    next()
	  } else {
	    res.status(403).send({
	      error: 'Please provide an Authorization header to identify yourself '
	    })
	  }

	if (req.token) {
		console.log("And responding to Channel Server")
		res.json({message: "hello world"})
		next()
	}
	else {
		res.status(403).send({
			error: 'Still looking for authorization '
		})
	}

});


module.exports = router;
