
var timezones = require('../timezones.json');
var _ = require('underscore');
var moment = require('moment');
module.exports = function(app) {
	// api ---------------------------------------------------------------------
	// get date string according to timezone.
	app.get('/api/parsetime', function(req, res) {
		var time = parseInt(req.query.time);
		var tz = req.query.tz;
		var timezone = _.find(timezones, function(thisItem){
			return thisItem.tz === tz;
		});
		if(timezone && time){
			var time = moment.unix(time+(3600000*timezone.offset)).format('YYYY-MM-DD HH:mm:ss');

			var responseData = {
				'time' : time,
				'text' : timezone.text
			};
		}
		else{
			var responseData = {
				'time' : 'not_found'
			};
		}
		res.json(responseData);
	});
	// get all timezones
	app.get('/api/timezones', function(req, res) {
		res.json(timezones);
	});
};
