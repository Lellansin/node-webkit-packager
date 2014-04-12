var CTRL_FLAG = false;
var K_CTRL = 17;
var KV_F7 = 118;
var DEBUG = false;

$(document).keyup(function(e) {
	if (e.which == K_CTRL) {
		CTRL_FLAG = false;
	}
	if (DEBUG) {
		print('up: ' + e.which);
	}
});

$(document).keydown(function(e) {
	if (e.which == K_CTRL) {
		CTRL_FLAG = true;
	}
	// ctrl + b
	if (e.which == "B".charCodeAt()) {
		if (CTRL_FLAG) {
			nw_run();
		}
	}
	// ctrl + g
	if (e.which == "G".charCodeAt()) {
		if (CTRL_FLAG) {
			nw();
		}
	}
	if (DEBUG) {
		print('down: ' + e.which);
	}
});