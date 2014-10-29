
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

$(document).ready(function() {
  
  $.ajax({
    type:"GET",
    url:"/workout"
  }).done(function(data){
    return data
    console.log(data);  
  });
});

//Open and close workout form
$(document).on('click', '#addWorkoutButton', function(){
      if ($('#addWorkoutPopup').hasClass("hidden")){
        $('#addWorkoutPopup').removeClass("hidden");
      }else{
        $('#addWorkoutPopup').addClass("hidden");
      }
    });

//Open and close editing the workout form
$(document).on('click', '#editWorkoutButton', function(){
      if($('#editWorkoutPopup').hasClass("hidden")){
        $('#editWorkoutPopup').removeClass("hidden");
      }else{
        $('#editWorkoutPopup').addClass("hidden");
      }
    });

//Open and close adding an exercise form
$(document).on('click', '#addExerciseButton', function(){
	if($('#addExercisePopup').hasClass('hidden')){
		$('#addExercisePopup').removeClass("hidden");
	}else{
		$('#addExercisePopup').addClass("hidden");
	}	
});

$(document).on('submit', '#editWorkoutForm', function(evt){
    evt.preventDefault();
    var formData = helpers.getFormData(this);
    $.ajax({
      type: "PUT",
      url: '/workout',
      data: formData
    }).done(function(response){
      $('#editWorkoutPopup').addClass('hidden');
    }).fail(function(failure){
      var response = $.parseJSON(failure.responseText);
    })
})

$(document).on('submit', '#addWorkoutForm', function(evt){
	evt.preventDefault();

	var formData = helpers.getFormData(this);
	$.ajax({
		type: "POST",
		url: '/workout',
		data: formData

	}).done(function(response){
      $('#addWorkoutPopup').addClass("hidden");
	}).fail(function(failure) {
    var response = $.parseJSON(failure.responseText);
  });
});


$(document).on('click', '#editExerciseButton', function(){
  if($('#editExercisePopup').hasClass('hidden')){
    $('#editExercisePopup').removeClass("hidden");
  }else{
    $('#editExercisePopup').addClass("hidden");
  } 
});







