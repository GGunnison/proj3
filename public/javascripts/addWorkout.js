$( document ).ready(function() {
	var data = {};
  	$('#addWorkout').html(Handlebars.templates['addWorkout']());
});


$(document).on('submit', '#addExerciseForm', function(evt){
	console.log('here');
	evt.preventDefault();

	var formData = helpers.getFormData(this);
	$.ajax({
		type: "POST",
		url: '/workout',
		data: formData

	}).done(function(response){
		loadPage('userPage');
	}).fail(function(jqxhr) {
    var response = $.parseJSON(jqxhr.responseText);
    loadPage('index', {error: response.err});
  });

});

var helpers = (function() {
  var self = {};
  self.getFormData = function(form) {
    var inputs = {};
    $(form).serializeArray().forEach(function(item) {
      inputs[item.name] = item.value;
    });
    return inputs;
  };
  return self;
})();