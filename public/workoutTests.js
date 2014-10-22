QUnit.asyncTest('add new user', function(assert){
	console.log('in third test');
	var u = 'Jimmy';
	//ADD USER
	$.ajax({
		type:"POST",
		url: "http://localhost:3000/users/add",
		data: {'username': u, "password": "mountains", "displayname": "Billy",
		'birthday': '02-13-34', "height": "5'1", "weight": 153, 'level': 'pro'},
		success: function(obj){
			var res = JSON.parse(obj);
			assert.equal(res.content.username, u);
			console.log('after first ajax call');

			//LOGIN
			$.ajax({
				type: "POST",
				url: "http://localhost:3000/users/login",
				data: {'username': u, 'password': 'mountains'},
				success: function(obj){
					var res = JSON.parse(obj);

					//DELETE USER
					$.ajax({
						type: "DELETE",
						url: "http://localhost:3000/users/" + u,
						data: {'username':u},
						success: function(obj){
							var res = JSON.parse(obj);
							console.log('returned from delete call');
							QUnit.start();
						}
					});
				}
			});
		}
	});
});
