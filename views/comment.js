$(function(){
	var source = $("#comment-template").html();
	var template = Handlebars.compile(source);
	var data = {name: 'Nick', date: 'Oct 30, 2014', comment: 'testing'};
	$('document.body').html(template(data));	
});