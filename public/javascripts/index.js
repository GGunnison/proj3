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
