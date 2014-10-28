$( document ).ready(function() {
	var data = {name: 'Bench', weight: '220', setCount: '3', repCount: '5'};
  	$('#exerciseDetails').html(Handlebars.templates['exerciseDetails'](data));
});