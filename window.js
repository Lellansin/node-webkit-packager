var gui = require('nw.gui');
var path = require('path');
var util = require('util');

var win = gui.Window.get();

console.log(util.inspect(process, true, 8));

fs.readFile(path.join(process.env.TEMP, 'nw_packager.tmp'), function(err, data) {
	if (err) {
		console.log(err);
		return;
	}
	$('#file').val(data);
});