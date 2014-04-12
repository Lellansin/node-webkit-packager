var fs = require('fs');
var archiver = require('archiver');
var underscore = require('underscore');
var path = require('path');
var child_process = require('child_process');

function Packager(options) {
	this.options = options;
	this.list = {};
	this.init();
}

Packager.prototype.init = function() {
	var self = this;
	var options = self.options || {};
	self.nw = 'nw';
	self.debug = options.debug || false;
	self.suffix = options.suffix || '.nw';
};

Packager.prototype.genrate = function(dirpath, options, callback) {
	var self = this;
	var opt = {};
	var cb = function() {};
	if (!callback) {
		if (!underscore.isFunction(options)) {
			opt = options;
		} else {
			cb = options;
		}
	} else {
		opt = options;
		cb = callback;
	}
	if (!fs.lstatSync(dirpath).isDirectory()) {
		if (path.basename(dirpath) == "package.json") {
			dirpath = path.dirname(dirpath);
		} else {
			cb('Path is not Directory!');
			return;
		}
	}
	var outfile = path.join(dirpath, path.basename(dirpath) + (opt.suffix || self.suffix));
	var output = fs.createWriteStream(outfile);
	var archive = archiver('zip');
	output.on('close', function() {
		console.log('File archiver ' + (archive.pointer() / 1024 / 1024).toFixed(2) + 'MB');
		if (opt.debug || self.debug) {
			var childProcess = child_process.execFile(self.nw, [outfile], {
				cwd: dirpath
			}, function(err) {
				if (err) {
					console.log('- err: ' + err);
				}
			});
			// todo::
			// self.mark(path.basename(dirpath), childProcess.pid);
		}
		cb();
	});
	archive.on('error', cb || function(err) {
		throw new Error(err);
	});
	archive.pipe(output);
	archive.bulk([{
		expand: true,
		cwd: dirpath,
		src: ['**']
	}]);
	archive.finalize();
};

Packager.prototype.run = function(dir, cb, cb_end) {
	var self = this;
	var dirpath = path.dirname(dir);
	var filepath = path.join(dirpath, (path.basename(dirpath) + self.suffix));
	var childProcess = child_process.execFile(self.nw, [filepath], {
		cwd: dirpath
	}, cb_end);
	cb(null, childProcess.pid);
};

Packager.prototype.mark = function(name, pid) {
	var self = this;
	self.clear(name);
	self.list[name] = pid;
};

Packager.prototype.clear = function(name) {
	var self = this;
	if ( !! self.list[name] && self.list[name] > 0) {
		process.kill(self.list[name], 'SIGKILL');
		self.list[name] = 0;
	}
};

// genrate myself
if (!typeof(window) || path.basename(process.title).indexOf('cmd.exe') >= 0) {
	console.log('Package itself:');
	var pack = new Packager({
		debug: true
	});
	pack.genrate('.', function(err) {
		console.log('success!');
	});
}

module.exports = Packager;