$( document ).ready(function() {
	var data = {date: 'Oct 31, 2014'};
  	$('#workout').html(Handlebars.templates['workoutDetails'](data));
});