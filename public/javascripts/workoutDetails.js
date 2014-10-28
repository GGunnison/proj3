$( document ).ready(function() {
	var data = {date: '10/31/14'};
  	$('#workoutDetails').html(Handlebars.templates['workoutDetails'](data));
});