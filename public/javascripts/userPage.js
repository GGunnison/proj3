
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
    url:"/workout",
  }).done(function(data){
    console.log(data);
      $('#main-container').html(Handlebars.templates['userPage'](data));

  });
});


$(document).on('click', '.editWorkout', function(){
    if($(this).parent().children(".editWorkoutPopup").hasClass('hidden')){
      $(this).parent().children(".editWorkoutPopup").removeClass("hidden");
    }else{
      $(this).parent().children(".editWorkoutPopup").addClass("hidden");
    }
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
	console.log('asdf');
	if($('#addExercisePopup').hasClass('hidden')){
		$('#addExercisePopup').removeClass("hidden");
	}else{
		$('#addExercisePopup').addClass("hidden");
	}	
});
//Add a workout to the database
$(document).on('submit', '#addWorkoutForm', function(evt){
	evt.preventDefault();

	var formData = helpers.getFormData(this);
	$.ajax({
		type: "POST",
		url: '/workout',
		data: formData

	 });
  $.ajax({
    type:"GET",
    url: '/workout',

  }).done(function(data){
      console.log(data);
      $('#addWorkoutPopup').addClass("hidden");
       $('#main-container').html(Handlebars.templates['userPage'](data));
	}).fail(function(jqxhr) {
    var response = $.parseJSON(jqxhr.responseText);
    loadPage('index', {error: response.err});
  });
});

$(document).on('click', '#editExerciseButton', function(){
  console.log('asdf');
  if($('#editExercisePopup').hasClass('hidden')){
    $('#editExercisePopup').removeClass("hidden");
  }else{
    $('#editExercisePopup').addClass("hidden");
  } 
});

$(document).on('click', '#deletebutton', function(evt){
    evt.preventDefault();
    var id = $(this).val();
    console.log(id);
    $.ajax({
      type:"DELETE",
      url:'/workout',
      data: {workoutID:id}
    });
    $.ajax({
    type:"GET",
    url: '/workout',

  }).done(function(data){
       $('#main-container').html(Handlebars.templates['userPage'](data));
     });
});

$(document).on('submit', '.editWorkoutForm', function(evt){
    evt.preventDefault();
    var formData = helpers.getFormData(this); 
    
    $.ajax({
      type:"PUT",
      url:"/workout",
      data: formData
    });
    $.ajax({
    type:"GET",
    url: '/workout',

  }).done(function(data){
    $('#editExercisePopup').addClass("hidden");
    $('#main-container').html(Handlebars.templates['userPage'](data));
     });
})
Handlebars.registerHelper('trimString', function(passedString) {
    var theString = passedString.substring(0,10);
    return new Handlebars.SafeString(theString)
});







