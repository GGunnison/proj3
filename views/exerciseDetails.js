$( document ).ready(function() {
	var data = {name: 'Bench', weight: '220', setCount: '3', repCount: '5'};
	var source = $("#exerciseDetails-template").html();
  	$('#exercise').html(Handlebars.templates['exerciseDetails'](data));
});