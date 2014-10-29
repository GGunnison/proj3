
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

$(document).on('click', '.addExerciseButton', function(){
    if($(this).parent().children(".addExercisePopup").hasClass('hidden')){
      $(this).parent().children(".addExercisePopup").removeClass("hidden");
    }else{
      $(this).parent().children(".addExercisePopup").addClass("hidden");
    }
});




$(document).on('submit', '#addExerciseForm', function(evt) {
  evt.preventDefault();
  var formData = helpers.getFormData(this);
  var date = $('#workout_id').innerHTML

  formData.workoutID = "544ed46e6726410000df13b7"; //TODO: change this

  console.log(date);
  console.log(formData);
  $.ajax({
    type: "POST",
    url: '/workout/exercises',
    data: formData

  }).done(function(response){
    $('#addExercisePopup').addClass("hidden");

  }).fail(function(jqxhr) {
    console.log('FAILED in add exercise button');
    //var response = $.parseJSON(jqxhr.responseText);
    //loadPage('index', {error: response.err});
  });
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

$(document).on('submit', '.addExerciseForm', function(){
  var formData = helpers.getFormData(this);
  //alert("WID " + formData.workoutID);
  $.ajax({
    type: "POST",
    url: '/workout/exercises',
    data: formData

   });
  $.ajax({
    type:"GET",
    url: '/workout',

  }).done(function(data){
      console.log(data);
      $('#addExercisePopup').addClass("hidden");
       //$('#main-container').html(Handlebars.templates['userPage'](data));
  }).fail(function(jqxhr) {
    var response = $.parseJSON(jqxhr.responseText);
    loadPage('index', {error: response.err});
  });

});

// $(document).on('click', '#editExerciseButton', function(){
//   console.log('asdf');
//   if($('#editExercisePopup').hasClass('hidden')){
//     $('#editExercisePopup').removeClass("hidden");
//   }else{
//     $('#editExercisePopup').addClass("hidden");
//   } 
// });

$(document).on('click', '.editExerciseButton', function(){
    if($(this).parent().children(".editExercisePopup").hasClass('hidden')){
      $(this).parent().children(".editExercisePopup").removeClass("hidden");
    }else{
      $(this).parent().children(".editExercisePopup").addClass("hidden");
    }
});







