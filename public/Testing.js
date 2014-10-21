
test("testing Login", function(){


	// $.post('http://localhost:3000', {username: 'Grant', password: 'hello'}).done(
	// 	function(data){
	// 		alert("data loaded: " + data);
	// });

	$.ajax({
		type: "POST",
		url: "http://localhost:3000/users/login",
		data: {'username':'Grant', 'password': 'hello'},
		success: function(obj){
			console.log(obj);
		}
	});
	//request.post('https://localhost:3000', {form: {username:'Grant', password:'hello'}})

});