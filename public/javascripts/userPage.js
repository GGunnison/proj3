//Author's Nick & Grant

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

//Immediately calls when userpage is loaded
$(document).ready(function() {
  $.ajax({
    type:"GET",
    url:"/workout",
  }).done(function(data){
      $('#main-container').html(Handlebars.templates['userPage'](data));

  });
});

//Open and close edit workout form
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
$(document).on('click', '.addExerciseButton', function(){
    if($(this).parent().children(".addExercisePopup").hasClass('hidden')){
      $(this).parent().children(".addExercisePopup").removeClass("hidden");
    }else{
      $(this).parent().children(".addExercisePopup").addClass("hidden");
    }
});

//Opens the form to edit the exercise
$(document).on('click', '.editExerciseButton', function(){
    if($(this).parent().children(".editExercisePopup").hasClass('hidden')){
      $(this).parent().children(".editExercisePopup").removeClass("hidden");
    }else{
      $(this).parent().children(".editExercisePopup").addClass("hidden");
    }
});
//Edit a workout date
$(document).on('submit', '.editWorkoutForm', function(evt){
    evt.preventDefault();
    var formData = helpers.getFormData(this);
    $.ajax({
      type: "PUT",
      url: '/workout',
      data: formData
    });
    $.ajax({
      type:"GET",
      url: '/workout'
    }).done(function(data){
      $('.editWorkoutPopup').addClass('hidden');
      $('#main-container').html(Handlebars.templates['userPage'](data));
  }).fail(function(jqxhr) {
    }).fail(function(failure){
      var response = $.parseJSON(failure.responseText);
    });
});

//adds a workout to the user
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
      $('#addWorkoutPopup').addClass("hidden");
       $('#main-container').html(Handlebars.templates['userPage'](data));
	}).fail(function(jqxhr) {
    var response = $.parseJSON(jqxhr.responseText);
    loadPage('index', {error: response.err});
  });
});

//adds the exercise to a workout
$(document).on('submit', '.addExerciseForm', function(){
  var formData = helpers.getFormData(this);
  $.ajax({
    type: "POST",
    url: '/workout/exercises',
    data: formData

   });
  $.ajax({
    type:"GET",
    url: '/workout',

  }).done(function(data){
      $('#addExercisePopup').addClass("hidden");
       //$('#main-container').html(Handlebars.templates['userPage'](data));
  }).fail(function(jqxhr) {
    var response = $.parseJSON(jqxhr.responseText);
    loadPage('index', {error: response.err});
  });

});

//deletes the workout
$(document).on('click', '#deletebutton', function(evt){
    evt.preventDefault();
    var id = $(this).val();
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

//When the edit function is called the edit exercise form is submitted
$(document).on('submit', '.editExerciseForm', function(evt){

    evt.preventDefault();
    var formData = helpers.getFormData(this); 
    
    $.ajax({
      type:"PUT",
      url:"/workout/exercises",
      data: formData
    });

    $.ajax({
    type:"GET",
    url: '/workout',

  }).done(function(data){
    $('#editExercisePopup').addClass("hidden");
    $('#main-container').html(Handlebars.templates['userPage'](data));
     });
});
//Delete an exercise from a workout
$(document).on('click', '#deleteExerciseButton', function(evt){
    evt.preventDefault();
    var id = $(this).val();
    $.ajax({
      type:"DELETE",
      url:'/workout/exercises',
      data: {exerciseID:id}
    });
    $.ajax({
    type:"GET",
    url: '/workout',

  }).done(function(data){
       $('#main-container').html(Handlebars.templates['userPage'](data));
     });
});

//Logs the user out 
$(document).on('click', '#logoutButton', function(evt){
  $(location).attr('href','/logout');
});


Handlebars.registerHelper('trimString', function(passedString) {
    var theString = passedString.substring(0,10);
    return new Handlebars.SafeString(theString)
});







