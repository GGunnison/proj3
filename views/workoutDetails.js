$( document ).ready(function() {
	var data = {date: 'Oct 31, 2014'};
	var source = $("#workoutDetails-template").html();
  	$('#workout').html(Handlebars.templates['workoutDetails'](data));
});