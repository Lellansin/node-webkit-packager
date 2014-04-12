var fs = require('fs');

var dropEvent = function(id, cb) {
	var dropbox = document.getElementById(id);
	dropbox.addEventListener("dragover", function(e) {
		e.stopPropagation();
		e.preventDefault();
	}, false);
	dropbox.addEventListener("drop", function(e) {
		e.stopPropagation();
		e.preventDefault();
		cb(e.dataTransfer.files);
	}, false);
};

var nw = function() {
	var file = $("#file").val();
	$("#dropbox_nw_msg").css("color", "orange");
	$("#dropbox_nw_msg").html("Process starting...");
	pack.run(file, function(err, pid) {
		$("#dropbox_nw_msg").css("color", "red");
		$("#dropbox_nw_msg").html("Process started: pid: " + pid);
	}, function(err) {
		if (err) {
			$("#dropbox_nw_msg").css("color", "orange");
			$("#dropbox_nw_msg").html("err: " + err);
		} else {
			$("#dropbox_nw_msg").css("color", "green");
			$("#dropbox_nw_msg").html("Process is closed");
		}
	});
};

var nw_run = function() {
	var file = $("#file").val();
	$("#dropbox_nw_run_msg").attr("file", file);
	$("#dropbox_nw_run_msg").css("color", "red");
	$("#dropbox_nw_run_msg").html("genrating...");
	pack.genrate(file, {
		debug: true
	}, function(err) {
		if (err) {
			console.log("err!");
			print(err);
		} else {
			print("success!");
			$("#dropbox_nw_run_msg").css("color", "green");
			$("#dropbox_nw_run_msg").html("Success! Click to continue packager(Ctrl+B)");

			$("#dropbox_nw_run_msg").click(function() {
				$("#dropbox_nw_run_msg").css("color", "red");
				$("#dropbox_nw_run_msg").html("genrating...");
				var file = $("#dropbox_nw_run_msg").attr("file");
				pack.genrate(file, {
					debug: true
				});
			});

			var file = $('#file').val();
			fs.writeFile(path.join(process.env.TEMP, 'nw_packager.tmp'), file, function(err) {
				if (err) {
					alert(err);
				}
			});
		}
	});
	print("Start genrating");
};

$(document).ready(function() {
	dropEvent("dropbox_nw", function(files) {
		underscore.each(files, function(item) {
			$("#file").val(item.path);
			print(item.path + " " + item.name);
		});
		nw();
		print("Start genrating");
	});

	dropEvent("dropbox_nw_run", function(files) {
		print("Start genrating and run!");
		underscore.each(files, function(item) {
			$("#file").val(item.path);
			print(item.path + " " + item.name);
		});
		nw_run();
	});
});