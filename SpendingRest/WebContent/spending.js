$(document).ready(function() {
  console.log("loaded");
  loadSpendingTrackers();

});




var loadSpendingTrackers = function() {
	$.ajax({
		type : "GET",
		url : "rest/trackers",
		dataType : "json",
	}).done(function(data, status) {
		console.log(data);
		displayTable(data);
	}).fail(function(xhr, status, error) {
		console.log('It blew up');
		console.log(error);
	});
};
