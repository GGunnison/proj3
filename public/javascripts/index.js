var loadPage = function(template, data) {
  data = data || {};
  $('#main-container').html(Handlebars.templates[template](data));
};

var loadHomePage = function() {
    loadPage('index', null);
};

$(document).ready(function(){
		loadHomePage();
});


$(document).on('click', '#register-button', function(evt) {
  console.log('hello');
  evt.preventDefault();
  var formData = helpers.getFormData(this);
  if (formData.password !== formData.confirm) {
    $('.error').text('Password and confirmation do not match!');
    return;
  }
  delete formData['confirm'];
  $.post(
    '/signup',
    formData
  ).done(function(response) {
  	console.log("here")
    loadHomePage();
  }).fail(function(jqxhr) {
    var response = $.parseJSON(jqxhr.responseText);
    loadPage('index', {error: response.err});
  });
});
