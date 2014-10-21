var users = db.get('users')
var utils = require('../utils/utils');

router.get('/', function(req,res) {
	console.log("redirecting to users login")
	res.redirect('/users/:dirk');
});



module.exports = router;