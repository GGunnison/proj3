
$(document).ready(function(){
    //do nothing for now
  });


$(document).on('submit', '#register-form', function(evt) {
  evt.preventDefault();
  var formData = helpers.getFormData(this);
  if (formData.password !== formData.confirm) {
    $('.error').text('Password and confirmation do not match!');
    return;
  }
  delete formData['confirm'];

  $.ajax({ 
  	type: "POST",	
    url: '/signup',
    data : formData
}).done(function(response) {
  }).fail(function(jqxhr) {
    var response = $.parseJSON(jqxhr.responseText);
  });
});

// $(document).on('submit', '#signin-form', function(evt) {
//   evt.preventDefault();
//   $.ajax({
//   	type: "POST",
//   	url: '/login',
//   	data : helpers.getFormData(this)
//   }).done(function(response) {
//     currentUser = response.username;
//     loadPage('userPage');
//   }).fail(function(jqxhr) {
//     var response = $.parseJSON(jqxhr.responseText);
//     loadPage('index', {error: response.err});
//   });
// });
